import React, { useState, useEffect } from "react";
import Form from "../../reusable/Form";
import { Helmet } from "react-helmet";

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
  useEffect(() => {
    if (questions?.length) {
      localStorage.setItem("exam", JSON.stringify(values));
      localStorage.setItem("questions", JSON.stringify(questions));
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

  // console.log(`Radio`, radioChecked);
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
      id: "opt1",
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption1,
      // onClick: () => setRadioChecked(!radioChecked),
      checked: radioChecked["id"],
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
      id: "opt2",
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption2,
      // onClick: () => setRadioChecked(!radioChecked),
      checked: radioChecked["id"],
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
      id: "opt3",
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption3,
      // onClick: () => setRadioChecked(!radioChecked),
      checked: radioChecked["id"],
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
      id: "opt4",
      name: "answer",
      type: "radio",
      value: examQuestions.txtOption4,
      // onClick: () => setRadioChecked(!radioChecked),
      checked: radioChecked["id"],
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
      disabled: questions?.length < 14,
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
      name: "Add",
      className: "btn btn-primary",
      value: "Add",
      disabled: questions?.length >= 14,
    },
    {
      type: "submit",
      name: "submit",
      className: "btn btn-success",
      value: "Submit",
      disabled: questions?.length <= 14,
    },
   {
      type: "button",
      name: "Pre",
      className: "btn btn-dark",
      value: "Pre",
      disabled: questions?.length < 1 || currState === 0
    },
   {
      type: "button",
      name: "Next",
      className: "btn btn-dark",
      value: "Next",
      disabled: questions?.length < 1 || currState === 14,
    },
   {
      type: "button",
      name: "Edit",
      className: "btn btn-primary",
      value: "Edit",
    },
  ];

  console.log(`currState`, currState)
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

    setValues({
      subjectName: examQuestions.subjectName,
      questions: questions,
      notes: [examQuestions.notes],
    });
    next();
    setRadioChecked({
      opt1: false,
      opt2: false,
      opt3: false,
      opt4: false,
    });
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
  };

  const pre = () => {
    const localExam = JSON.parse(localStorage.getItem("exam"));
    const localQuestion = JSON.parse(localStorage.getItem("questions"));

    setQuestions(localQuestion);
    setValues(localExam);

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
    setExamQuestions({ ...examQuestions, [name]: value });
    setRadioChecked({
      ...radioChecked,
      [id]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submit`);
    setValues({
      subjectName: examQuestions.subjectName,
      questions,
      notes: [examQuestions.notes],
    });
  };

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
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
