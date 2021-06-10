import { getToken, getData } from "./../utility/localStorage";
import React, { useState } from "react";
import Form from "../reusable/Form";
import { Helmet } from "react-helmet";
import API, { endpoint } from "../utility/axiosApi";
import { useHistory } from "react-router-dom";
import validations from "../utility/validation";

const ResetPassword = () => {
  const initialState = {
    oldPassword: "",
    Password: "",
    ConfirmPassword: "",
  };
  const [values, setValues] = useState(initialState);
  const [showError, setShowError] = useState(initialState);
  const history = useHistory();

  const formAttributes = {
    oldPassword: {
      name: "oldPassword",
      value: values.oldPassword,
      type: "password",
      className: "form-control",
      placeholder: "Old Password",
      label: "Old Password",
      errorMessage: "* Password must be at least 6 characters",
      errorValue: showError.oldPassword,
    },
    password: {
      name: "Password",
      value: values.Password,
      type: "password",
      className: "form-control",
      placeholder: "Password",
      label: "Password",
      errorMessage: "* Password must be at least 6 characters",
      errorValue: showError.Password,
    },
    ConfirmPassword: {
      name: "ConfirmPassword",
      value: values.ConfirmPassword,
      type: "password",
      className: "form-control",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      errorMessage: "* Password not match",
      errorValue: showError.ConfirmPassword,
    },
  };

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
    const data = getData();
    if (!ValidationForm(showError)) {
      await API.post(endpoint.resetPassword, values, {
        headers: { "access-token": getToken() },
      }).then((res) => {
        const result = res.data;
        if (result.statusCode === 200) {
          alert(result.message);
          data.role === "student"
            ? history.push("/student")
            : history.push("/teacher");
        } else {
          alert(result.message);
        }
      });
    } else {
      setShowError({
        oldPassword: true,
        Password: true,
        ConfirmPassword: true,
      });
    }
  };

  return (
    <div className="container login-container">
      <Helmet>
        <html lang="en" />
        <title>Reset Password</title>
        <meta name="description" content="Examination Demo" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Reset Password</h3>
          <Form
            content={formAttributes}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            showError={showError}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
