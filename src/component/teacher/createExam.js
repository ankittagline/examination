import React, { useState } from "react";
import Form from "../../reusable/Form";
import { Helmet } from "react-helmet";

const CreateExam = () => {
  const subjectOptions = ["PHY", "CHE", "MATHS"];

  const initialState = {
    subjectName: "",
  };
  const [questions, setQuestions] = useState([]);

  const [showError, setShowError] = useState(initialState);
  const formAttributes = {
    question: {
      name: "question",
      type: "text",
      placeholder: "Enter Question",
      label: "Question",
      className: "form-control",
    },
    option1: {
      name: "option",
      type: "radio",
    },
    txtOption1: {
      name: "txtOption1",
      type: "text",
      className: "form-control",
      placeholder: "Answer 1",
      label: "Ans 1",
    },
    option2: {
      name: "option",
      type: "radio",
    },
    txtOption2: {
      name: "txtOption2",
      type: "text",
      className: "form-control",
      placeholder: "Answer 2",
      label: "Ans 2",
    },
    option3: {
      name: "option",
      type: "radio",
    },
    txtOption3: {
      name: "txtOption3",
      type: "text",
      className: "form-control",
      placeholder: "Answer 3",
      label: "Ans 3",
    },
    option4: {
      name: "option",
      type: "radio",
    },
    txtOption4: {
      name: "txtOption4",
      type: "text",
      className: "form-control",
      placeholder: "Answer 4",
      label: "Ans 4",
    },
    answer: {
      name: "answer",
      type: "text",
      placeholder: "Enter Answer",
      label: "Answer",
      className: "form-control",
      disabled: true,
    },
    notes: {
      name: "notes",
      type: "text",
      className: "form-control",
      placeholder: "Notes",
      label: "Notes",
    },
  };

  const select = {
    name: "select",
    className: "form-control",
    option: subjectOptions,
  };

  const handleChange = (e) => {};

  const handleSubmit = () => {};

  return (
    <div className="container login-container">
      <Helmet>
        <html lang="en" />
        <title>Create Exam</title>
        <meta name="description" content="Examination Demo" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>

      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Create Exam</h3>

          <Form
            select={select}
            content={formAttributes}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showError={showError}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
