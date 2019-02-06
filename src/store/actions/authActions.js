import { axiosInstance } from '../../config/api';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = newUser => dispatch => {
  axiosInstance
    .post("/graphql", newUser)
    .then(res => {
      window.confirm("Congrat, you was successfully registered. Please login first !")
      dispatch({ type: "REGISTER_SUCCESS" });
    })
    .catch(err => {
      dispatch({ type: "REGISTER_ERROR", err });
    });
};

export const loginUser = userData => dispatch => {
  axiosInstance
    .post("/graphql", userData)
    .then(res => {
      // Save to localstorage
      const { token } = res.data.data.login;
      
      // Set token to localstorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user;
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({ type: "LOGIN_ERROR", err });
    });
};

//Set login user
export const setCurrentUser = decoded => {
  return {
    type: "LOGIN_SUCCESS",
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
