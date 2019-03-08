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

class EditProduct extends React.Component {
  state = {
    id: this.props.dataProduct.dataProduct._id,
    picture: this.props.dataProduct.dataProduct.picture,
    "product-name": this.props.dataProduct.dataProduct.name,
    price: this.props.dataProduct.dataProduct.price,
    weight: this.props.dataProduct.dataProduct.weight,
    description: this.props.dataProduct.dataProduct.description,
    specification: this.props.dataProduct.dataProduct.specification,
    variation: this.props.dataProduct.dataProduct.variation,
    tags: this.props.dataProduct.dataProduct.tags,
    category: this.props.dataProduct.dataProduct.category,
    stock: this.props.dataProduct.dataProduct.stock,
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
          editAdminProduct(productInput: {name:"${
            this.state["product-name"]
          }", price:${this.state.price}, weight:${
        this.state.weight
      }, description: "${this.state.description}", specification:"${
        this.state.specification
      }", variation:"${this.state.variation}", tags:"${
        this.state.tags
      }", category:"${this.state.category}", stock:${
        this.state.stock
      }, picture:"${this.state.picture}"}, idProduct: "${this.state.id}"){
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
          window.confirm(`Congrat, You Successfully Edit Product!`);
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
    if(this.state.picture !== ""){
      imagesEl = (
        <img
          src={this.state.picture}
          alt={this.state["product-name"]}
          width="300"
          height="200"
        />
      )
    }
    return (
      <Page className="DashboardPage container">
        <Row>
          <Col sm={12} className="text-center">
            <h1>Edit A Product</h1>
          </Col>
          <Col sm={12}>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  id="product-name"
                  placeholder="Product Name"
                  defaultValue={this.state["product-name"]}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  id="price"
                  placeholder="Price"
                  defaultValue={this.state.price}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  id="weight"
                  placeholder="Weight"
                  defaultValue={this.state.weight}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  id="description"
                  placeholder="Description"
                  defaultValue={this.state.description}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  id="specification"
                  placeholder="Specification"
                  defaultValue={this.state.specification}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  id="variation"
                  placeholder="Variation"
                  defaultValue={this.state.variation}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="tags"
                  placeholder="tags"
                  defaultValue={this.state.tags}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  type="select"
                  name="select"
                  id="category"
                  defaultValue={this.state.category}
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
                  defaultValue={this.state.stock}
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
                Edit Product
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
)(EditProduct);
