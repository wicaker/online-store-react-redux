import React from "react";

import { axiosInstance } from "../../config/api";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
import {
  Table,
  Row,
  Col,
  Button
} from "reactstrap";


import SuccessPurchase from "./SuccessPurchase";
import ReceivedPayment from "./ReceivedPayment";

import Page from "components/Page";


class SummaryPage extends React.Component {
  state = {
    soldPendingProduct: []
  };
  componentDidMount() {
    const requestBody = {
      query: `
        query{
          soldsAll{
            _id
            total
            name_receiper
            destination_city
            payment_method
            product{
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
          soldPendingProduct: res.data.data.soldsAll
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleAddSuccess = id => {
    const requestBody = {
      query: `
        mutation {
          successSoldProduct(soldId: "${id}"){
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
        this.setState(prevState => {
          const updateSoldPendingProduct = prevState.soldPendingProduct.filter(
            p => p._id !== id
          );
          return { soldPendingProduct: updateSoldPendingProduct };
        });
        window.confirm("User have been successfully purchase !");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const statusPurchase = this.state.soldPendingProduct.map(status => {
      return (
        <tr key={status._id}>
          <td>{status._id}</td>
          <td>{status.product._id}</td>
          <td>$ {status.total} </td>
          <td>{status.name_receiper}</td>
          <td>{status.destination_city} </td>
          <td>
            <Button onClick={this.handleAddSuccess.bind(this, status._id)}>
              Add to Success
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <Page className="DashboardPage" title="Summary">
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div>
              <h5>Received Payment</h5>
            </div>
            <ReceivedPayment />
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div>
              <h5>Pending Purchase</h5>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>PendingId</th>
                  <th>ProductId</th>
                  <th>Total</th>
                  <th>Receiper Name</th>
                  <th>Destination City (Kode) </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{statusPurchase}</tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div>
              <h5>Success Purchase</h5>
            </div>
            <SuccessPurchase />
          </Col>
        </Row>

        {/* <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Total Revenue{" "}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Profit"
              subtitle="This month"
              number="9.8k"
              color="secondary"
              progress={{
                value: 75
              }}
            />
          </Col>
        </Row> */}
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
)(SummaryPage);
