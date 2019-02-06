import React from "react";

import { Button, Table } from "reactstrap";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/productActions"; //connect to productActions
import { axiosInstance } from "../../config/api";

class SuccessPurchaseMember extends React.Component {
  state = {
    soldSuccessProduct: []
  };
  componentDidMount() {
    const requestBody = {
      query: `
        query{
          successSoldProducts{
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
          soldSuccessProduct: res.data.data.successSoldProducts
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const statusPurchase = this.state.soldSuccessProduct.map(status => {
      return (
        <tr key={status._id}>
          <td>{status.product._id}</td>
          <td>$ {status.total} </td>
          <td>{status.name_receiper}</td>
          <td>{status.destination_city} </td>
          <td>
            <Button color="success"> Success</Button>
          </td>
        </tr>
      );
    });

    return (
      <Table>
        <thead>
          <tr>
            <th>ProductId</th>
            <th>Total</th>
            <th>Receiper Name</th>
            <th>Destination City (Kode) </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{statusPurchase}</tbody>
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
)(SuccessPurchaseMember);
