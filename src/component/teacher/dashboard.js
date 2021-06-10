import { Route  } from 'react-router-dom';
import React from "react";
import Navbar from './navBar';
import CreateExam from './createExam';


const Dashboard = () => {
  return <div>
      <h1>Teacher </h1>
      <Navbar />
      <Route path="/teacher/createexam" component={CreateExam} />      
  </div>;
};

export default Dashboard;
