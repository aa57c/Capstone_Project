import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import store from '../store';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
} from "./types";

export const registerUser = (userData, history) => dispatch => {
    axios
      .post("https://job-board-backend-yq3b.onrender.com/register", userData)
      .then(res => history.push("https://job-board-backend-yq3b.onrender.com/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
      .post("https://job-board-backend-yq3b.onrender.com/login", userData)
      .then(res => {
        // Save to localStorage// Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        const email = userData.email;
        const isAdmin = userData.isAdmin
        //check if the current user is an admin
        // Set current user
        dispatch(setCurrentUser({decoded, email, isAdmin}));
        console.log("user logged in");
        //console.log(userData);
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  // Set logged in user
  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };// User loading
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };// Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    console.log("user logged out");
    dispatch(setCurrentUser({}));
  };

