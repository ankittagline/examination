import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../component/login";
import Registration from "../component/registration";
import ForgotPwd from "../component/forgotPassword";
import Teacher from "../component/teacher/dashboard";
import NewPassword from "../component/newPassword";
import Student from '../component/student/dashboard';
import ResetPassword from "../component/resetPassword"

const Routes = () => {
    return(
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/forgot" component={ForgotPwd} />
          <Route path="/teacher" component={Teacher} />
          <Route path="/newPassword" component={NewPassword} />
          <Route path="/student"component={Student} />
          <Route path="/resetPassword" component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    )
}
export default Routes 