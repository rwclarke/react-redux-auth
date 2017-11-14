import axios from 'axios';

const ROOT_URL = 'http://localhost:1337';

export function signinUser({ email, password }) {
  return function(dispatch) {

    axios.post(`${ROOT_URL}/api/login`, { 
      email: email, 
      password: password
    });

      // submit email/password to the server

      // If request is good...
      // - Update state to indicate use ris authenticated
      // - Save the JWT token
      // - redirect to route /feature

      // If request is bad
      // - Show an error to user
  }
}