export const setToken = (token) => {
  localStorage.setItem("access-token", token);
};
export const getToken = () => {
  return localStorage.getItem("access-token");
};
export const setData = (data) => {
  localStorage.setItem("data", data);
};
export const getData = () => {
  return JSON.parse(localStorage.getItem("data"));
};
export const removeToken = () => {
  localStorage.clear();
};
