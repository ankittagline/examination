import React, { useState, useEffect } from "react";
import Form from "../../reusable/Form";
import { Helmet } from "react-helmet";
import validations from "../../utility/validation";

const CreateExam = () => {
  const subjectOptions = ["PHY", "CHE", "MATHS", "GUJ"];

  // const initialState = {
  //   subjectName: "",
  //   questions: [
  //     {
  //       question: "",
  //       answer: "",
  //       options: [],
  //     },
  //   ],
  //   notes: [],
  // };
  const [values, setValues] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currState, setCurrState] = useState(0);
  const [radioChecked, setRadioChecked] = useState(false);
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
  const [showError, setShowError] = useState(examQuestions);

  const que = [...questions].reverse();

  useEffect(() => {
    if (questions?.length) {
      localStorage.setItem("questions", JSON.stringify(questions));
      localStorage.setItem("exam", JSON.stringify(values));
    }

    if (questions && questions[currState]) {
      setExamQuestions({
        subjectName: values.subjectName,
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
  }, [questions, currState, values]);
  useEffect(() => {
    const localExam = JSON.parse(localStorage.getItem("exam"));
    const localQuestion = JSON.parse(localStorage.getItem("questions"));
    if (localStorage.getItem("questions")) {
      setQuestions(localQuestion);
      setValues(localExam);
    }
  }, []);

  const clickManage = (name) => {
    switch (name) {
      case "Add":
        return addQuestion();
      case "Pre":
        return pre();
      case "Next":
        return next();
      case "Edit":
        return editQuestion();
    }
  };

  const addQuestion = () => {
    if (!ValidationForm(showError)) {
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
      setValues({
        subjectName: examQuestions.subjectName,
        questions: questions,
        notes: examQuestions.notes,
      });
      next();
      setRadioChecked(false);
    } else {
      setShowError({
        subjectName: true,
        question: true,
        txtOption2: true,
        txtOption3: true,
        txtOption4: true,
        txtOption1: true,
        notes: true,
        answer: true,
      });
    }
  };

  const editQuestion = () => {
    const edit = [...questions];
    edit[currState].answer = examQuestions.answer;
    edit[currState].question = examQuestions.question;
    edit[currState].options[0] = examQuestions.txtOption1;
    edit[currState].options[1] = examQuestions.txtOption2;
    edit[currState].options[2] = examQuestions.txtOption3;
    edit[currState].options[3] = examQuestions.txtOption4;
    setQuestions(edit);
    next();
    setRadioChecked(false);
  };

  const pre = () => {
    if (currState > 0) {
      setCurrState(currState - 1);
    }
  };

  const next = () => {
    if (currState < 14) {
      setCurrState(currState + 1);
    }
  };

  const handleChange = (e) => {
    const { name, value, id, checked } = e.target;
    const form = examQuestions;
    const error = showError;
    form[name] = value;
    error[name] = !validations(name, value);
    setExamQuestions({ ...examQuestions, [name]: value });
    setRadioChecked({
      [id]: checked,
    });
    setShowError(error);
  };

  const ValidationForm = (error) => {
    let valid = false;
    valid = Object.values(error).some((val) =>
      val === false && val !== "" ? false : true
    );
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion();
    setValues({
      subjectName: examQuestions.subjectName,
      questions: questions,
      notes: examQuestions.notes,
    });
  };

  const formAttributes = {
    question: {
      name: "question",
      type: "text",
      placeholder: "Enter Question",
      label: "Question",
      className: "form-control",
      value: examQuestions.question,
      errorMessage: "Question is required",
      errorValue: showError.question,
    },
    option1: {
      id: "opt1",
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption1,
      checked: radioChecked["opt1"],
    },

    txtOption1: {
      name: "txtOption1",
      type: "text",
      className: "form-control",
      placeholder: "Answer 1",
      label: "Ans 1",
      value: examQuestions.txtOption1,
      errorMessage: "required",
      errorValue: showError.txtOption1,
    },
    option2: {
      id: "opt2",
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption2,
      checked: radioChecked["opt2"],
    },
    txtOption2: {
      name: "txtOption2",
      type: "text",
      className: "form-control",
      placeholder: "Answer 2",
      label: "Ans 2",
      value: examQuestions.txtOption2,
      errorMessage: "required",
      errorValue: showError.txtOption2,
    },
    option3: {
      id: "opt3",
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption3,
      checked: radioChecked["opt3"],
    },
    txtOption3: {
      name: "txtOption3",
      type: "text",
      className: "form-control",
      placeholder: "Answer 3",
      label: "Ans 3",
      value: examQuestions.txtOption3,
      errorMessage: "required",
      errorValue: showError.txtOption3,
    },
    option4: {
      id: "opt4",
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption4,
      checked: radioChecked["opt4"],
    },
    txtOption4: {
      name: "txtOption4",
      type: "text",
      className: "form-control",
      placeholder: "Answer 4",
      label: "Ans 4",
      value: examQuestions.txtOption4,
      errorMessage: "required",
      errorValue: showError.txtOption4,
    },
    answer: {
      name: "answer",
      type: "text",
      placeholder: "Enter Answer",
      label: "Answer",
      className: "form-control",
      disabled: true,
      value: examQuestions.answer,
      errorMessage: "required",
      errorValue: showError.answer,
    },
    notes: {
      name: "notes",
      type: "text",
      className: "form-control",
      placeholder: "Notes",
      label: "Notes",
      value: examQuestions.notes,
      disabled: questions?.length <= 4,
      errorMessage: "required",
      errorValue: showError.notes,
    },
  };

  const select = {
    name: "subjectName",
    className: "form-control",
    option: subjectOptions,
    label: "Subject Name",
    value: examQuestions.subjectName,
    errorMessage: "Please Select Exam",
    errorValue: showError.subjectName,
    disabled: questions?.length > 1,
  };

  const button = [
    {
      type: "button",
      name: currState === questions.length ? "Add" : "Edit",
      className: "btn btn-primary",
      value: currState === questions.length ? "Add" : "Edit",
      disabled:
        questions?.length >= 4
          ? true
            ? currState === questions.length
            : true
          : false,
    },
    {
      type: "submit",
      name: "submit",
      className: "btn btn-success",
      value: "Submit",
      disabled: questions?.length < 4,
    },
    {
      type: "button",
      name: "Pre",
      className: "btn btn-dark",
      value: "Pre",
      disabled: questions?.length < 1 || currState === 0,
    },
    {
      type: "button",
      name: "Next",
      className: "btn btn-dark",
      value: "Next",
      disabled: currState === questions.length,
    },
    {
      type: "button",
      name: "Edit",
      className: "btn btn-primary",
      value: "Edit",
      hidden: "true",
    },
  ];

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
          Question: {currState + 1} / 15
          <Form
            select={select}
            content={formAttributes}
            handleChange={(index) => handleChange(index)}
            showError={showError}
            button={button}
            onClick={(name) => clickManage(name)}
            handleSubmit={addQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
