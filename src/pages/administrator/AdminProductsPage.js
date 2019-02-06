import React from "react";

import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table
} from "reactstrap";

import Page from "components/Page";

import EditProduct from "./EditProduct";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/productActions"; //connect to productActions
import { axiosInstance } from "../../config/api";

class AdminProductsPage extends React.Component {
  state = {
    modal: false,
    dataProduct: ""
  };
  toggle(data) {
    this.setState({
      modal: !this.state.modal,
      dataProduct: data
    });
  }
  componentDidMount() {
    const requestBody = {
      query: `
        query{
          adminProducts{
            _id
            name
            picture
            price
            stock
            weight
            description
            specification
            variation
            tags
            category
          }
        }
      `
    };
    this.props.getAdminProducts(requestBody);
  }

  handleDeleteProduct = id => {
    const requestBody = {
      query: `
        mutation{
          deleteAdminProduct(productId: "${id}"){
            _id
          }
        }
      `
    };
    axiosInstance
      .post("/graphql", requestBody)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed delete product");
        }
        window.confirm("Congrat, you successfully deleted product");
      })
      .catch(err => console.log(err));
  };

  render() {
    let listProduct = <div>No Products</div>;
    if (this.props.product.adminProducts) {
      listProduct = this.props.product.adminProducts.map(product => {
        return (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>
              <img
                src={product.picture}
                alt={product.name}
                width="50"
                height="100"
              />
            </td>
            <td>{product.stock}</td>
            <td>$ {product.price} </td>
            <td>
              <Button color="primary" onClick={this.toggle.bind(this, product)}>
                Edit
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>
                  Edit Product
                </ModalHeader>
                <ModalBody>
                  <EditProduct dataProduct={this.state} />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggle.bind(this)}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
              <Button
                onClick={this.handleDeleteProduct.bind(this, product._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      });
    }
    return (
      <Page className="DashboardPage container">
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{listProduct}</tbody>
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
)(AdminProductsPage);
