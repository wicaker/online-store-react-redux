import React from "react";

import { Table } from "reactstrap";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/productActions"; //connect to productActions
import { axiosInstance } from "../../config/api";

class ReceivedPayment extends React.Component {
  state = {
    showReceivedPaypalPayment: []
  };
  componentDidMount() {
    const requestBody = {
      query: `
        query{
          showReceivedPaypalPayment{
            _id
            pendingId
            email
            payer_id
            payment_id
            payment_token
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
          showReceivedPaypalPayment: res.data.data.showReceivedPaypalPayment
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const receivedPayment = this.state.showReceivedPaypalPayment.map(status => {
      return (
        <tr key={status._id}>
          <td>{status.pendingId}</td>
          <td>{status.email} </td>
          <td>{status.payer_id}</td>
          <td>{status.payment_id} </td>
          <td>{status.payment_token} </td>
        </tr>
      );
    });

    return (
      <Table>
        <thead>
          <tr>
            <th>pendingId</th>
            <th>email</th>
            <th>payerId</th>
            <th>paymentId</th>
            <th>paymentToken</th>
          </tr>
        </thead>
        <tbody>{receivedPayment}</tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actionCreators
)(ReceivedPayment);
