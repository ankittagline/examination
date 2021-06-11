import React, { useState } from "react";
import Form from "../reusable/Form";
import { Helmet } from "react-helmet";
import { useLocation, useHistory } from "react-router";
import API, { endpoint } from "../utility/axiosApi";
import validations from "../utility/validation";

const NewPassword = () => {
  const param = useLocation().search;
  const history = useHistory();

  const initialState = {
    Password: "",
    ConfirmPassword: "",
  };

  const [values, setValues] = useState(initialState);
  const [showError, setShowError] = useState(initialState);

  const formAttributes = {
    Password: {
      name: "Password",
      value: values.Password,
      type: "password",
      className: "form-control",
      placeholder: "Password",
      label: "Password",
      errorMessage: "* Password must at least 6 characters",
      errorValue: showError.Password,
    },
    ConfirmPassword: {
      name: "ConfirmPassword",
      value: values.ConfirmPassword,
      type: "password",
      className: "form-control",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      errorMessage: "* Password is not match",
      errorValue: showError.ConfirmPassword,
    },
  };
  const button = [
    {
      value: "Submit",
      className: "btn btn-primary",
    },
  ];

  const handleChange = (e) => {
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
    valid = Object.values(error).some((val) =>
      val === false && val !== "" ? false : true
    );
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ValidationForm(showError)) {
      await API.post(endpoint.verifyPassword + param, values).then((res) => {
        const result = res.data;
        if (result.statusCode === 200) {
          alert(result.message);
          history.push("/");
        } else {
          alert(result.message);
        }
      });
    } else {
      setShowError({
        Password: true,
      });
    }
  };

  return (
    <div className="container login-container">
      <Helmet>
        <html lang="en" />
        <title>New Password</title>
        <meta name="description" content="Examination Demo" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>New Password</h3>
          <Form
            content={formAttributes}
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

export default NewPassword;
