import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import API, { endpoint } from "../utility/axiosApi";
import { setToken, setData } from "../utility/localStorage";
import Form from "../reusable/Form";
import validations from "../utility/validation";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [values, setValue] = useState(initialState);
  const [showError, setShowError] = useState(initialState);
  let history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const form = values;
    const error = showError;
    form[name] = value;
    error[name] = !validations(name, value);
    setValue({ ...values, [name]: value });
    setShowError(error);
  };

  const formAttributes = {
    email: {
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
      value: values.email,
      className: "form-control",
      errorMessage: "* invalid Email",
      errorValue: showError.email,
      autoComplete: "off",
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
  };

  const ValidationForm = (error) => {
    let valid = false;
    // Object.values(showError).some((val) =>
    //   val === false && val !== "" ? false : true && valid === false
    // );
    valid = Object.values(error).some((val) =>
      val === false && val !== "" ? false : true
    );
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ValidationForm(showError)) {
      await API.post(endpoint.login, values).then((res) => {
        const results = res.data;
        if (results.statusCode === 200) {
          setToken(results.data.token);
          setData(JSON.stringify(results.data));
          results.data.role === "student"
            ? history.push("/student")
            : history.push("/teacher");
        } else {
          alert(results.message);
        }
      });
    } else {
      setShowError({ email: true, password: true });
    }
  };
  const button = [
    {
      value: "Login",
      className: "btn btn-primary",
    },
  ];

  return (
    <div className="container login-container">
      <Helmet>
        <html lang="en" />
        <title>Login</title>
        <meta name="description" content="Examination Demo" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>

      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <Form
            content={formAttributes}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showError={showError}
            button={button}
          />
          <div className="form-group">
            <Link className="ForgetPwd" to="/registration">
              Sign Up
            </Link>
          </div>
          <div className="form-group">
            <Link className="ForgetPwd" to="/forgot">
              Forget Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
