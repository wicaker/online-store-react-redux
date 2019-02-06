import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import * as actionCreators from "../store/actions/authActions"; //connect to authActions


class AuthForm extends React.Component {
  state = {
    name: "",
    email: "",
    status: "" || "customer",
    password: ""
  };

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.props.authState === STATE_SIGNUP){
      const requestBody = {
        query: `
          mutation {
            createUser(userInput:{name: "${this.state.name}", email: "${this.state.email}", password: "${this.state.password}", status: "${this.state.status}"}){
              _id
              name
            }
          }
        `
      }; 
      this.props.registerUser(requestBody);
      this.props.onChangeAuthState(STATE_LOGIN);
    }
    else if(this.props.authState === STATE_LOGIN){
      const requestBody = {
        query: `
          query {
            login(email: "${this.state.email}", password: "${this.state.password}"){
              token
            }
          }
        `
      }; 
      this.props.loginUser(requestBody);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    if(this.props.auth.isAuthenticated) return <Redirect to='/' />
    const {
      showLogo,
      // usernameLabel,
      // usernameInputProps,
      // passwordLabel,
      // passwordInputProps,
      // nameLabel,
      // nameInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label>Name</Label>
            <Input placeholder='input name' id='name' onChange ={this.handleChange} type='text'/>
          </FormGroup>
        )}
        <FormGroup>
          <Label >Email</Label>
          <Input placeholder='input email' id='email' onChange ={this.handleChange} type='email'/>
        </FormGroup>
        <FormGroup>
          <Label >Password</Label>
          <Input placeholder='input password' id='password' onChange ={this.handleChange} type='password'/>
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label>Status</Label>
            <Input type="select" id="status" onChange ={this.handleChange} value={this.value}>
              <option value="customer">customer</option>
              <option value="administrator">administrator</option>
            </Input>
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  // usernameLabel: PropTypes.string,
  // usernameInputProps: PropTypes.object,
  // passwordLabel: PropTypes.string,
  // passwordInputProps: PropTypes.object,
  // confirmPasswordLabel: PropTypes.string,
  // confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  // usernameLabel: 'Email',
  // usernameInputProps: {
  //   type: 'email',
  //   placeholder: 'your@email.com',
  // },
  // passwordLabel: 'Password',
  // passwordInputProps: {
  //   type: 'password',
  //   placeholder: 'your password',
  // },
  // confirmPasswordLabel: 'Confirm Password',
  // confirmPasswordInputProps: {
  //   type: 'password',
  //   placeholder: 'confirm your password',
  // },
  // nameLabel: 'Name',
  // nameInputProps: {
  //   type: 'text',
  //   placeholder: 'Add your name',
  //   defaultValue:'Wicak'
  // },
  // // statusLabel: 'Confirm Password',
  // // statusInputProps: {
  // //   type: 'password',
  // //   placeholder: 'confirm your password',
  // // },
  onLogoClick: () => {},
};

// export default AuthForm;

//connect redux store to component
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actionCreators
)(AuthForm);
