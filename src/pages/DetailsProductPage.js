import React from "react";

import { axiosInstance } from "../config/api";

import { Row, Col, FormGroup, Input, Button } from "reactstrap";

import { Redirect } from "react-router-dom";

import Page from "components/Page";

import { connect } from "react-redux";
import * as actionCreators from "../store/actions/productActions"; //connect to productActions

class DetailProductPage extends React.Component {
  state = {
    detailProduct: [],
    amountProduct: "1",
    addBookingStatus: false
  };
  componentDidMount() {
    const idProducts = this.props.match.params.id;
    const requestBody = {
      query: `
        query{
          product(id:"${idProducts}"){
            _id
            name
            price
            picture
            weight
            description
            specification
            variation
            tags
            category
            stock
            seller {
              _id
            }
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
          detailProduct: res.data.data.product
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleBooking = e => {
    e.preventDefault();
    if (!this.props.auth.isAuthenticated) {
      return window.confirm("Sorry, You Must Login First !");
    }
    const idProducts = this.props.match.params.id;
    const requestBody = {
      query: `
        mutation {
          bookingItem(bookingInput: {product:"${idProducts}", amount: ${
        this.state.amountProduct
      }}){
            _id
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
        if (res.data.errors) {
          return window.confirm("You Must Login as Customer !");
        }
        this.setState({
          addBookingStatus: true
        });
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
    if (this.state.addBookingStatus) return <Redirect to="/listbookings" />;
    return (
      <Page className="DashboardPage container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <img
              src={this.state.detailProduct.picture}
              alt={this.state.detailProduct.name}
            />
          </Col>
          <Col lg={12} md={12} sm={12}>
            <h1>{this.state.detailProduct.name}</h1>
            <h5>Price : $ {this.state.detailProduct.price}</h5>
            <h5>Weight : {this.state.detailProduct.weight} gram</h5>
            <h6>description : {this.state.detailProduct.description}</h6>
            <h5>Stock : {this.state.detailProduct.stock}</h5>
            <form onSubmit={this.handleBooking}>
              <FormGroup>
                <Input
                  type="number"
                  max={this.state.detailProduct.stock}
                  min="1"
                  defaultValue="1"
                  id="amountProduct"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button type="submit" value="submit">
                Add to Wishlist
              </Button>
            </form>
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
)(DetailProductPage);
