import React from "react";

import { axiosInstance } from "../../config/api";

import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Form,
  Label,
  FormText
} from "reactstrap";

import { Redirect } from "react-router-dom";

import Page from "components/Page";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions"; //connect to authActions

class AddProductPage extends React.Component {
  state = {
    picture: "",
    "product-name": "",
    price: "",
    weight: "",
    description: "",
    specification: "",
    variation: "",
    tags: "",
    category: "" || "handphone",
    stock: "",
    addProductStatus: false
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  handleChangeImage = e => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    axiosInstance.post(`/image-upload`, formData).then(res => {
      this.setState({
        picture: res.data[0].secure_url
      });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const requestBody = {
      query: `
        mutation {
          createProduct(productInput: {name:"${
            this.state["product-name"]
          }", price:${this.state.price}, weight:${
        this.state.weight
      }, description: "${this.state.description}", specification:"${
        this.state.specification
      }", variation:"${this.state.variation}", tags:"${
        this.state.tags
      }", category:"${this.state.category}", stock:${
        this.state.stock
      }, picture:"${this.state.picture}"}){
            _id
          }
        }
      `
    };
    axiosInstance
      .post("/graphql", requestBody)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        if (res.errors) {
          window.confirm("Make sure your data input valid!");
        } else {
          window.confirm(`Congrat, You Successfully Adding Product!`);
          this.setState({
            addProductStatus: true
          });
        }
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
    if (this.state.addProductStatus) return <Redirect to="/adminproducts" />;
    let imagesEl = "";
    this.state.picture !== ""
      ? (imagesEl = (
          <img
            src={this.state.picture}
            alt={this.state["product-name"]}
            width="500"
            height="600"
          />
        ))
      : imagesEl;
    return (
      <Page className="DashboardPage container">
        <Row>
          <Col sm={12} className="text-center">
            <h1>Add New Product</h1>
          </Col>
          <Col sm={12}>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  id="product-name"
                  placeholder="Product Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  id="price"
                  placeholder="Price"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  id="weight"
                  placeholder="Weight"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  id="description"
                  placeholder="Description"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  id="specification"
                  placeholder="Specification"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  id="variation"
                  placeholder="Variation"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="tags"
                  placeholder="tags"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  type="select"
                  name="select"
                  id="category"
                  value={this.value}
                  onChange={this.handleChange}
                >
                  <option value="handphone">Handphone</option>
                  <option value="tablet">Tablet</option>
                  <option value="laptopconsumer">Laptop Consumer</option>
                  <option value="laptopgaming">Laptop Gaming</option>
                  <option value="macbook">Mac Book</option>
                  <option value="ultrabook">UltraBook</option>
                  <option value="playstation">Play Station</option>
                  <option value="nintendo">Nintendo</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  id="stock"
                  placeholder="Stock"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="picture">Add Picture</Label>
                <Input
                  type="file"
                  name="file"
                  id="picture"
                  onChange={this.handleChangeImage}
                />
                <FormText color="muted">Add your picture product</FormText>
              </FormGroup>
              <div>{imagesEl}</div>
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={this.handleSubmit}
              >
                Add New Product
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
)(AddProductPage);
