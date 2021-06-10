import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export const endpoint = {
  login: "users/Login",
  register: "users/SignUp",
  forgotPassword: "users/ForgotPassword",
  verifyPassword: "users/ForgotPassword/Verify",
  resetPassword: "users/ResetPassword"
};
