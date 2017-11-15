import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderInput = field => (
  <div>
      <input {...field.input} type={field.type} className="form-control" />
      {
          field.meta.touched &&
          field.meta.error &&
          <span className="error">{field.meta.error}</span>
      }
  </div>
);

class Signin extends Component {

  handleFormSubmit({email, password}) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <Field
              name="email"                            // Specify field name
              component={renderInput}        // Specify render component above
              type="email"                            // Specify "type" prop passed to renderInput
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <Field
              name="password"                            // Specify field name
              component={renderInput}        // Specify render component above
              type="password"                            // Specify "type" prop passed to renderInput
            />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin' 
})(
  connect(mapStateToProps, actions)(Signin)
);