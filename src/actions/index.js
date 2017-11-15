import axios from 'axios';
import { browserHistory } from 'react-router'; 
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'YOUR_ROOT_URL';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/api/v1/auth/login`, { 
      email: email, 
      password: password
    }).then(response => {      
      // If request is good...
      // - Update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
      // - Save the JWT token
      localStorage.setItem('token', response.data.authorization);
      // - redirect to route /feature
      browserHistory.push('/dashboard');
    }).catch(error => {
      // If request is bad
      // - Show an error to user
      console.log(error);
      dispatch(authError('Bad Login Info'));
    });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/api/v1/users`, { 
      email: email, 
      password: password
    }).then(response => {      
      console.log(response);
      browserHistory.push('/signin');
    }).catch(error => {
      // If request is bad
      // - Show an error to user
      console.log(error);
      dispatch(authError('Bad Signup Info'));
    });
  }
}

export function signoutUser() {
  localStorage.setItem('token', null);
  return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage(error) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/v1/users`, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
      dispatch({ 
        type: FETCH_MESSAGE,
        payload: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
}