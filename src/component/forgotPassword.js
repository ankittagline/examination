import React, { useState } from "react";
import Form from "../reusable/Form";
import { Helmet } from "react-helmet";
import API, { endpoint } from "../utility/axiosApi";
import validations from "../utility/validation";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const history = useHistory();
  const initialState = {
    email: "",
  };
  const [values, setValues] = useState(initialState);
  const [showError, setShowError] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const form = values;
    const error = showError;
    form[name] = value;
    error[name] = !validations(name, value);

    setValues({ ...values, [name]: value });
    setShowError(error);
  };

  const ValidationForm = (error) => {
    let valid = true;
    valid = Object.values(error).every((val) =>
      val === false && val !== "" ? false : true
    );
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ValidationForm(showError)) {
      await API.post(endpoint.forgotPassword, values).then((res) => {
        const result = res.data;
        if (result.statusCode === 200) {
          alert(result.message);
          history.push("/");
        } else {
          alert(result.message);
        }
      });
    } else {
      setShowError({ email: true });
    }
  };

  const forgotPassword = {
    email: {
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
      value: values.email,
      className: "form-control",
      errorMessage: "*invalid Email",
      errorValue: showError.email,
    },
  };
  const button = [
    {
      value: "Submit",
      className: "btn btn-primary",
    },
  ];

  return (
    <div className="container login-container">
      <Helmet>
        <html lang="en" />
        <title>Forgot Password</title>
        <meta name="description" content="Examination Demo" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Forgot Password</h3>
          <Form
            content={forgotPassword}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            showError={showError}
            button={button}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
