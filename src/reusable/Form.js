import React from "react";
import Input from "./reusebleInput";
import Select from "./reusableSelect";

const Form = ({ handleSubmit, handleChange, content, showError, select }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {console.log(`select`, select)}
        {select && <Select {...select}/>}
        {Object.values(content).map((item, index) => {
          const name = item.name;
          const error = showError[name];
          return (
            <Input
              key={index}
              handleChange={handleChange}
              errorValue={error}
              {...item}
            />
          );
        })}
        <Input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
