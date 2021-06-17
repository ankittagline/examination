import { email, password, confirmPassword, name, Password, ConfirmPassword, oldPassword, role, subjectName, question, options, notes, answer,} from "./validationConstant";
import { emailValidation, passwordValidation, isEmpty } from "./regex";

let passwordValue = "";
export default (pattern, value) => {
  if (pattern === password) {
    passwordValue = value;
  }
  if (pattern === Password) {
    passwordValue = value;
  }
  switch (pattern) {
    case name:
      return isEmpty(value);
    case email:
      return emailValidation(value);
    case password:
      return passwordValidation(value);
    case oldPassword:
      return passwordValidation(value);
    case confirmPassword:
      return value === passwordValue;
    case Password:
      return passwordValidation(value);
    case ConfirmPassword:
      return value === passwordValue;
    case role:
      return true;
    case subjectName:
      return isEmpty(value);
    case question:
      return isEmpty(value);
    case options:
      return isEmpty(value);
    case notes:
      return isEmpty(value);
    case answer:
      return isEmpty(value);
    default:
      return false;
  }
};
