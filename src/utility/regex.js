export const emailValidation = (email) => {
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return regex.test(email);
};

export const passwordValidation = (password) => {
  // const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,20}$/;
     const regex = /^.{6,}$/
  return regex.test(password);
};

export const isEmpty = (value, isBoolean) =>
  value !== undefined ? value : isBoolean ? false : "";
