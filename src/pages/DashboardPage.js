import React from "react";

import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

import { NavLink } from "react-router-dom";
import Page from "components/Page";

import { connect } from "react-redux";
import * as actionCreators from "../store/actions/productActions"; //connect to productActions

class DashboardPage extends React.Component {
  componentDidMount() {
    const requestBody = {
      query: `
        query{
          products {
            _id
            name
            price
            picture
          }
        }
      `
    };
    this.props.getAllProducts(requestBody);
  }

  render() {
    const listProduct = this.props.product.allProducts.map(product => {
      return (
        <Col lg={3} md={6} sm={6} xs={12} key={product._id}>
          <Card>
            <CardImg
              top
              width="100%"
              height="300px"
              src={product.picture}
              alt={product.name}
            />
            <CardBody>
              <CardTitle>{product.name}</CardTitle>
              <CardSubtitle>{product.price}</CardSubtitle>
              <NavLink to={"/detail/" + product._id}>
                <Button>Preview</Button>
              </NavLink>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return (
      <Page className="DashboardPage">
        <Row>{listProduct}</Row>
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
)(DashboardPage);
