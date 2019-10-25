import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import classNames from 'classnames';


var phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
    full_name: "",
    email: "",
    contact_number: "",
    gender: '',
    password:'',
    cpassword:''
  };
  
  // Input feedback
const InputFeedback = ({ error }) =>
error ? (
  <div className="input-feedback" style={{width: "100%",marginTop: ".25rem",fontSize:" 80%",color:" #dc3545"}}>{error}</div>
) : null;


// Radio input
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
   
    <div className="form-check form-check-inline">
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('form-check-input')}
        {...props}
      />
      <label htmlFor={id} className="form-check-label">
        {label}
      </label>
    </div>
  );
};

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    'input-fiel',
    {
      'is-success': value || (!error && touched), // handle prefilled or user-filled
      'is-error': !!error && touched
    },
    className
  );

  return (
    <div className="form-group">
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched &&
          <InputFeedback error={error} />
        }
      </fieldset>
    </div>
    </div>
  );
};

export default class CreateUser extends Component {
    
    render(){
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              full_name: Yup.string().required("Full Name is required"),
              email: Yup.string()
                .email("please enter valid email")
                .required("Email is required"),
              contact_number: Yup.string()
                .matches(phoneRegEx, "contact number is not valid")
                .required("contact number is required"),
              password:Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
              cpassword:Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required')
            })}
            onSubmit={(fields, { resetForm }) => {
              const newUser = {
                full_name: fields.full_name,
                email: fields.email,
                contact_number: fields.contact_number,
                gender: fields.gender,
                password:fields.password
              };

              axios.post("http://localhost:4000/add", newUser).then(res => {
                console.log(res.data);
                this.props.history.push("/");
              });
            }}
            render={({ values, errors, status, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="full_name">Full Name</label>
                  <Field
                    name="full_name"
                    type="text"
                    value={values.full_name}
                    className={
                      "form-control" +
                      (errors.full_name && touched.full_name
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="full_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Contact Number</label>
                  <Field
                    name="contact_number"
                    type="text"
                    className={
                      "form-control" +
                      (errors.contact_number && touched.contact_number
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="contact_number"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

          <RadioButtonGroup
            id="gender"
            label="gender"
            value={values.gender}
            error={errors.gender}
            touched={touched.gender}
          >
            <Field
              component={RadioButton}
              name="gender"
              id="male"
              label="Male"
            />
            <Field
              component={RadioButton}
              name="gender"
              id="female"
              label="Female"
            />
          </RadioButtonGroup>

          <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <Field
                    name="cpassword"
                    type="password"
                    className={
                      "form-control" +
                      (errors.cpassword && touched.cpassword
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="cpassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">
                    Register
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Reset
                  </button>
                </div>
              </Form>
            )}
          />
        );
    }

}