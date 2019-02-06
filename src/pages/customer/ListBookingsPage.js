import React from "react";

import { axiosInstance } from "../../config/api";

import { Row, Button } from "reactstrap";

import { NavLink } from "react-router-dom";

import { Table } from "reactstrap";

import Page from "components/Page";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/productActions"; //connect to productActions

class ListBookingsPage extends React.Component {
  state = {
    listBookings: []
  };
  componentDidMount() {
    const requestBody = {
      query: `
        query{
          bookings(userId:"${this.props.auth.user.userId}"){
            _id
            amount
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
          listBookings: res.data.data.bookings
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const listBookings = this.state.listBookings.map(booking => {
      return (
        <tr key={booking._id}>
          <td />
          <td>{booking._id}</td>
          <td>{booking.amount}</td>
          <td>
            <NavLink to={"/purchase/" + booking._id}>
              <Button color="primary">Purchase</Button>
            </NavLink>
            <Button>Delete</Button>
          </td>
        </tr>
      );
    });
    return (
      <Page className="DashboardPage container">
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Amount Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{listBookings}</tbody>
          </Table>
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
)(ListBookingsPage);
