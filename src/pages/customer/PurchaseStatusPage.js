import React from "react";

import { axiosInstance } from "../../config/api";

import { Row, Button } from "reactstrap";

import PaypalPayment from "./paypal";

import { Table } from "reactstrap";

import SuccessPurchaseMember from "./SuccessPurchaseMember";

import Page from "components/Page";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/productActions"; //connect to productActions

class PurchaseStatusPage extends React.Component {
  state = {
    statusPurchase: []
  };
  componentDidMount() {
    const requestBody = {
      query: `
        query{
          solds{
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
          statusPurchase: res.data.data.solds
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  canclePurchase = id => {
    const requestBody = {
      query: `
        mutation {
          cancleSoldProduct(soldId: "${id}"){
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
          const updateStatusPurchase = prevState.statusPurchase.filter(
            p => p._id !== id
          );
          return { statusPurchase: updateStatusPurchase };
        });
        window.confirm("You have been canceling purchased this products !");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const statusPurchase = this.state.statusPurchase.map(status => {
      return (
        <tr key={status._id}>
          <td>{status.product._id}</td>
          <td>$ {status.total} </td>
          <td>{status.name_receiper}</td>
          <td>{status.destination_city} </td>
          <td>
            <PaypalPayment dataStatus={status} />
            <Button onClick={this.canclePurchase.bind(this, status._id)}>
              Cancel
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <Page className="DashboardPage container">
        <Row>
          <div>
            <h5>Pending Purchase</h5>
          </div>
          <Table>
            <thead>
              <tr>
                <th>ProductId</th>
                <th>Total</th>
                <th>Receiper Name</th>
                <th>Destination City (Kode) </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{statusPurchase}</tbody>
          </Table>
        </Row>
        <Row>
          <div>
            <h5>Success Purchase</h5>
          </div>
          <SuccessPurchaseMember />
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
)(PurchaseStatusPage);
