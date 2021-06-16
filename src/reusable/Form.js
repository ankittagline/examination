import React from "react";
import Input from "./reusebleInput";
import Select from "./reusableSelect";
import Button from "./Button";

const Form = ({
  handleSubmit,
  handleChange,
  content,
  showError,
  select,
  button,
  onClick,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {select && <Select {...select} handleChange={handleChange} />}
        {Object.values(content).map((item, index) => {
          const name = item.name;
          const error = showError[name];
          return (
            <Input
              key={index}
              handleChange={(index) => handleChange(index)}
              errorValue={error}
              {...item}
            />
          );
        })}
        {button &&
         button.map((button, index) => {
            return (
              <Button
                key={index}
                onClick={() => onClick(button.name)}
                {...button}
              />
            );
          })}
      </form>
    </div>
  );
};

export default Form;
