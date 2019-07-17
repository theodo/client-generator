import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import {Formik, Field } from 'formik';
import TextField from '@material-ui/core/TextField';

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  // renderField = data => {
  //   data.input.className = 'form-control';

  //   const isInvalid = data.meta.touched && !!data.meta.error;
  //   if (isInvalid) {
  //     data.input.className += ' is-invalid';
  //     data.input['aria-invalid'] = true;
  //   }

  //   if (this.props.error && data.meta.touched && !data.meta.error) {
  //     data.input.className += ' is-valid';
  //   }

  //   return (
  //     <div className={`form-group`}>
  //       <label
  //         htmlFor={`{{{lc}}}_${data.input.name}`}
  //         className="form-control-label"
  //       >
  //         {data.input.name}
  //       </label>
  //       <input
  //         {...data.input}
  //         type={data.type}
  //         step={data.step}
  //         required={data.required}
  //         placeholder={data.placeholder}
  //         id={`{{{lc}}}_${data.input.name}`}
  //       />
  //       {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
  //     </div>
  //   );
  // };

  render() {
    return (<Formik
      onSubmit={value => {
        console.log(value);
        this.props.onSubmit(value);
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
{{#each formFields}}
          <Field
            // component={this.renderField}
            name="{{{name}}}"
            type="{{{type}}}"{{#if step}}
            step="{{{step}}}"{{/if}}
            value={props.values['{{{name}}}']}
            render={field => (
              <TextField
                id="{{{name}}}"
                label="{{{name}}}"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                margin="normal"
                {...field}
              />
            )}
            // placeholder="{{{description}}}"{{#if required}}
            // required={true}{{/if}}{{#if reference}}{{#unless maxCardinality}}
            // normalize={v => (v === '' ? [] : v.split(','))}{{/unless}}{{/if}}{{#if number}}
            // normalize={v => parseFloat(v)}{{/if}}
          />
{{/each}}

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      )}/>
    );
  }
}

export default Form;
