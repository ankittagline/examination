import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Form from "../reusable/Form";
import API, { endpoint } from "../utility/axiosApi";
import validations from "../utility/validation";

const Registration = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  const [values, setValues] = useState(initialState);
  const [showError, setShowError] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const form = values;
    const error = showError;
    form[name] = value;
    error[name] = !validations(name, value);
    setValues({ ...values, [name]: value });
    setShowError(error);
  };

  const formAttributes = {
    name: {
      name: "name",
      type: "text",
      value: values.name,
      label: "Name",
      placeholder: "Name",
      className: "form-control",
      errorMessage: "* Name is required",
      errorValue: showError.name,
    },
    email: {
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
      value: values.email,
      className: "form-control",
      errorValue: showError.email,
      errorMessage: "* invalid Email",
    },
    password: {
      name: "password",
      type: "password",
      value: values.password,
      label: "Password",
      placeholder: "Password",
      className: "form-control",
      errorMessage: "* Password must be at least 6 characters",
      errorValue: showError.password,
    },
    teacher: {
      name: "role",
      type: "radio",
      value: "teacher",
      label: "Teacher",
      errorValue: showError.role,
      errorMessage: "* Role is required",
    },
    student: {
      name: "role",
      type: "radio",
      value: "student",
      label: "Student",
    },
  };
  const button = [
    {
      value: "Submit",
      className: "btn btn-primary",
    },
  ];

  const ValidationForm = (error) => {
    let valid = true;
    valid = Object.values(error).some((val) =>
      val === false && val !== "" ? false : true
    );
    return valid;
  };

  const handleSubmit = async (e) => {
    console.log(`showError`, showError);
    e.preventDefault();
    if (!ValidationForm(showError)) {
      await API.post(endpoint.register, values).then((res) => {
        const result = res.data;
        if (result.statusCode === 200) {
          alert(result.message + "\nPlease Verify Email");
        } else {
          alert(result.message);
        }
      });
    } else {
      setShowError({
        name: true,
        email: true,
        password: true,
        role: true,
      });
    }
  };

  return (
    <div className="container login-container">
      <Helmet>
        <html lang="en" />
        <title>Registration</title>
        <meta name="description" content="Examination Demo" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Registration</h3>
          <Form
            content={formAttributes}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            showError={showError}
            button={button}
          />
          <div className="form-group">
            <Link to="/">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
