import React from "react";

import { axiosInstance } from "../../config/api";

import { Row, Col, FormGroup, Input, Button, Form } from "reactstrap";

import { Redirect } from "react-router-dom";

import Page from "components/Page";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/productActions"; //connect to productActions

class PurchasePage extends React.Component {
  state = {
    name: "",
    phone: "",
    address: "",
    expedition: "" || "jne-0",
    city: "" || "1",
    payment: "" || "paypal",
    listCity: [],
    purchaseStatus: false
  };
  componentDidMount() {
    const requestBody = {
      query: `
        query{
          citys {
            city_id
            city_name
          }
        }
      `
    };
    axiosInstance
      .post("graphql", requestBody)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        this.setState({
          listCity: res.data.data.citys
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    const requestBody = {
      query: `
          mutation{
            soldProduct(soldInput:{bookingId:"${
              this.props.match.params.id
            }", name_receiper:"${this.state.name}", tlp_number:"${
        this.state.phone
      }", address:"${this.state.address}", expedition:"${
        this.state.expedition
      }", destination_city:"${this.state.city}", payment_method: "${
        this.state.payment
      }"}){
              _id
            }
          }
        `
    };
    axiosInstance
      .post("/graphql", requestBody)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          window.confirm("'Product has been purchased', cek status page!");
          throw new Error("Failed!");
        }
        this.setState({
          purchaseStatus: true
        });
        window.confirm("Please check email ! and your status page !");
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    if (this.state.purchaseStatus) return <Redirect to="/purchasestatus" />;
    const listCity = this.state.listCity.map(city => {
      return (
        <option value={city.city_id} key={city.city_id}>
          {city.city_name}
        </option>
      );
    });
    return (
      <Page className="DashboardPage container">
        <Row>
          <Col sm={12}>
            {" "}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  id="name"
                  placeholder="Receiper Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="phone"
                  placeholder="Phone Number"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="address"
                  placeholder="Full Address"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="select"
                  id="payment"
                  onChange={this.handleChange}
                  value={this.value}
                >
                  <option value="paypal">Paypal</option>
                  <option value="mandiri-bank">Mandiri</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type="select"
                  id="expedition"
                  onChange={this.handleChange}
                  value={this.value}
                >
                  <option value="jne-0">JNE Reguler</option>
                  <option value="jne-1">JNE Yes</option>
                  <option value="pos-0">POS Kilat</option>
                  <option value="pos-1">POS Express Same Day</option>
                  <option value="pos-2">POS Express Next Day</option>
                  <option value="tiki-0">TIKI Holiday</option>
                  <option value="tiki-1">TIKI Over Night</option>
                  <option value="tiki-2">TIKI REG</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type="select"
                  id="city"
                  onChange={this.handleChange}
                  value={this.value}
                >
                  {listCity}
                </Input>
              </FormGroup>
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={this.handleSubmit}
              >
                Purchase Now
              </Button>
            </Form>
          </Col>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actionCreators
)(PurchasePage);
