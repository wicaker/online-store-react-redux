import isEmpty from '../../validation/isEmpty';

const initState = {
  authError: null,
  isAuthenticated: false,
  user: {},
  registerStatus : false
}

const authReducer = (state = initState, action) => {
  switch (action.type){
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "Login failed"
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        authError: null,
        registerStatus: true
      };

    case "REGISTER_ERROR":
      return {
        ...state,
        authError: action.err.response.data
      };

    default:
      return state;
  }
}

export default authReducer;