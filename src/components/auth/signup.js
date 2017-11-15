import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {


  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} type={type}/>
        </div>
        {touched && ((error && <div className="error">{error}</div>))}
    </div>
  );


  handleFormSubmit({email, password, passwordConfirm}) {
    console.log(email, password, passwordConfirm);
    this.props.signupUser({ email, password });
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
            <Field name="email" label="Email" component={this.renderField}
              type="text"/>
          </fieldset>

          <fieldset className="form-group">
            <Field name="password" label="Password" component={this.renderField}
              type="password"/>
          </fieldset>

          <fieldset className="form-group">
            <Field name="passwordConfirm" label="Confirm Password" component={this.renderField}
              type="password"/>
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

function validate(formProps) {
  const errors = {};
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

export default reduxForm({
  form: 'signup',
  validate: validate
})(
  connect(mapStateToProps, actions)(Signup)
);