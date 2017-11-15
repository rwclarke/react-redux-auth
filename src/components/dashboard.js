import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        {this.props.message}
      </div>
    );
  }
}

function mapStateToProps(state) {

  if (state.auth.message) {
    return { 
      message: state.auth.message.map((user) => {
        return (
          <p key={user.id}>{user.email}</p>
        );
      })
    }
  } else {
    return { message: null }
  }
}

export default connect(mapStateToProps, actions)(Dashboard);