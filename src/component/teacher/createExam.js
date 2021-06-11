import React, { useState, useEffect } from "react";
import Form from "../../reusable/Form";
import { Helmet } from "react-helmet";

const CreateExam = () => {
  const subjectOptions = ["PHY", "CHE", "MATHS", "GUJ"];

  const initialState = {
    subjectName: "",
    questions: [
      {
        question: "",
        answer: "",
        options: [],
      },
    ],
    notes: [],
  };
  const [values, setValues] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currState, setCurrState] = useState(0);
  const [examQuestions, setExamQuestions] = useState({
    subjectName: "",
    question: "",
    answer: "",
    txtOption1: "",
    txtOption2: "",
    txtOption3: "",
    txtOption4: "",
    notes: "",
  });

  useEffect(() => {
    if (questions.length) {
      localStorage.setItem("question", JSON.stringify(questions));
    }

    if (questions[currState]) {
      setExamQuestions({
        subjectName: examQuestions.subjectName,
        question: questions[currState].question,
        answer: questions[currState].answer,
        txtOption1: questions[currState].options[0],
        txtOption2: questions[currState].options[1],
        txtOption3: questions[currState].options[2],
        txtOption4: questions[currState].options[3],
        notes: examQuestions.notes,
      });
    } else {
      setExamQuestions({
        subjectName: examQuestions.subjectName,
        question: "",
        answer: "",
        txtOption1: "",
        txtOption2: "",
        txtOption3: "",
        txtOption4: "",
        notes: examQuestions.notes,
      });
    }
  }, [questions, currState]);

  const [showError, setShowError] = useState(initialState);
  const formAttributes = {
    question: {
      name: "question",
      type: "text",
      placeholder: "Enter Question",
      label: "Question",
      className: "form-control",
      value: examQuestions.question,
    },
    option1: {
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption1,
    },
    txtOption1: {
      name: "txtOption1",
      type: "text",
      className: "form-control",
      placeholder: "Answer 1",
      label: "Ans 1",
      value: examQuestions.txtOption1,
    },
    option2: {
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption2,
    },
    txtOption2: {
      name: "txtOption2",
      type: "text",
      className: "form-control",
      placeholder: "Answer 2",
      label: "Ans 2",
      value: examQuestions.txtOption2,
    },
    option3: {
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption3,
    },
    txtOption3: {
      name: "txtOption3",
      type: "text",
      className: "form-control",
      placeholder: "Answer 3",
      label: "Ans 3",
      value: examQuestions.txtOption3,
    },
    option4: {
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption4,
    },
    txtOption4: {
      name: "txtOption4",
      type: "text",
      className: "form-control",
      placeholder: "Answer 4",
      label: "Ans 4",
      value: examQuestions.txtOption4,
    },
    answer: {
      name: "answer",
      type: "text",
      placeholder: "Enter Answer",
      label: "Answer",
      className: "form-control",
      disabled: true,
      value: examQuestions.answer,
    },
    notes: {
      name: "notes",
      type: "text",
      className: "form-control",
      placeholder: "Notes",
      label: "Notes",
      value: examQuestions.notes,
      disabled: questions.length < 3,
    },
  };

  const select = {
    name: "subjectName",
    className: "form-control",
    option: subjectOptions,
    label: "Subject Name",
    value: examQuestions.subjectName,
    disabled: questions.length > 1,
  };

  const button = [
    {
      type: "button",
      name: "Add",
      className: "btn btn-primary",
      value: "Add",
    },
    {
      type: "submit",
      name: "submit",
      className: "btn btn-success",
      value: "Submit",
      disabled: questions.length <= 15,
    },
    {
      type: "button",
      name: "Pre",
      className: "btn btn-dark",
      value: "Pre",
    },
    {
      type: "button",
      name: "Next",
      className: "btn btn-dark",
      value: "Next",
    },
  ];

  const clickManage = (name) => {
    switch (name) {
      case "Add":
        return addQuestion();
      case "Pre":
        return pre();
      case "Next":
        return next();
    }
  };

  const addQuestion = () => {
    let question = {
      question: examQuestions.question,
      answer: examQuestions.answer,
      options: [
        examQuestions.txtOption1,
        examQuestions.txtOption2,
        examQuestions.txtOption3,
        examQuestions.txtOption4,
      ],
    };

    setQuestions([...questions, question]);
    setExamQuestions({
      subjectName: examQuestions.subjectName,
      question: "",
      answer: "",
      txtOption1: "",
      txtOption2: "",
      txtOption3: "",
      txtOption4: "",
      notes: "",
    });
    next();
  };

  const pre = () => {
    setCurrState(currState - 1);
  };

  const next = () => {
    setCurrState(currState + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamQuestions({ ...examQuestions, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submit`);
    setValues({
      subjectName: examQuestions.subjectName,
      questions,
      notes: [examQuestions.notes],
    });
    setExamQuestions({
      subjectName: "",
      notes: "",
    });
  };
  useEffect(() => {
    console.log(`values`, values);
  }, [values]);

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
          Question: {questions.length} / 15
          <Form
            select={select}
            content={formAttributes}
            handleChange={handleChange}
            showError={showError}
            button={button}
            onClick={(name) => clickManage(name)}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
