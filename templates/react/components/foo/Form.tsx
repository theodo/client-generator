import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import {Formik, Field, FormikProps } from 'formik';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.css';

interface Props {
  initialValues: any;
  onSubmit: any;
}

class Form extends Component<Props> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object
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
  //   }FieldProps

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
      initialValues={this.props.initialValues}
      onSubmit={(value: any) => {
        console.log(value);
        this.props.onSubmit(value);
      }}
      render={(props: FormikProps<any>) => (
        <form onSubmit={props.handleSubmit}>
{{#each formFields}}
          <Field
            name="{{{name}}}"
            type="{{{type}}}"{{#if step}}
            step="{{{step}}}"{{/if}}
            value={props.values['{{{name}}}']}
            render={({ field }: any) => (
              <TextField
                id="{{{name}}}"
                label="{{{name}}}"
                margin="normal"
                {...field}
              />
            )}
          />
{{/each}}
          {/* <FieldArray
                name="roles"
                render={arrayHelpers => (
                  <>
                    {props.values['roles'] && props.values['roles'].length > 0 ? (
                      props.values['roles'].map((role, index) => (
                        <div key={index}>
                          <Field name={`roles.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button type="button" onClick={() => arrayHelpers.push('')}>
                        Add a friend
                      </button>
                    )}
                  </>
                )}
              /> */}
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      )}/>
    );
  }
}

export default Form;
