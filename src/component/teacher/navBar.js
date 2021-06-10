import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const header = () => {
  const onClick = () => {
    localStorage.clear();
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-md flex-nowrap navbar-new-top">
        <ul className="nav navbar-nav mr-auto"></ul>
        <ul className="navbar-nav flex-row">
          <Link to="/" className="nav-item">
            <Button onClick={onClick}>Logout</Button>
          </Link>
          <Link to="/resetPassword">
            <Button variant="primary">Reset Password</Button>
          </Link>
          <li className="nav-item"></li>
        </ul>
        <button
          className="navbar-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbar2"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <nav className="navbar  navbar-expand-md navbar-new-bottom">
        <div className="navbar-collapse collapse pt-2 pt-md-0" id="navbar2">
          <ul className="navbar-nav w-100 justify-content-center px-3">
            <Link to="/teacher/allStudent" className="nav-item">
              Show Students{" "}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Nav>
              <Link to="/teacher/verifyStudent" className="nav-item">
                Verify Student Detail
              </Link>
            </Nav>
            &nbsp;&nbsp;&nbsp;
            <Nav>
              <Link to="/teacher/createexam" className="nav-item">
                Create Exam
              </Link>
            </Nav>
            &nbsp;&nbsp;&nbsp;
            <Nav>
              <Link to="/teacher/viewexam" className="nav-item">
                View Exam
              </Link>
            </Nav>
            &nbsp;&nbsp;&nbsp;
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default header;
