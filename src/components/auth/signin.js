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
    console.log('hello');
    console.log(email, password);
    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
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
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
  
})(
  connect(null, actions)(Signin)
);