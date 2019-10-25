import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const initialValues = {
    email: "",
    password:''
  };

export default class Login extends Component {
    
    render(){
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("please enter valid email")
                .required("Email is required"),
              password:Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
            })}
            onSubmit={(fields, { resetForm }) => {
              const newUser = {
                email: fields.email,
                password:fields.password
              };

              axios.post("http://localhost:4000/login", newUser).then(res => {
                // setter
                  localStorage.setItem('myData', res.data.token);
                  console.log(res.data.massage);
                //this.props.history.push("/");
              }).catch(function (error){
                console.log(error)
              });
            }}
            render={({ values, errors, status, touched }) => (
              <Form>
              
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
                  <button type="submit" className="btn btn-primary mr-2">
                    Login
                  </button>
                </div>
              </Form>
            )}
          />
        );
    }

}