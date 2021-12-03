const jwt = require("jsonwebtoken");

const verifyExistingToken = () => {
  return new Promise((resolve) => {
    if (getToken() === null) {
      resolve(false);
    } else {
      resolve(true);
    }
  });
};

const setToken = (token) => {
  return new Promise((resolve) => {
    if (token) {
      localStorage.setItem("jwt", token);
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const removeToken = () => {
  return new Promise((resolve) => {
    localStorage.removeItem("jwt");
    resolve(true);
  });
};

const getToken = () => {
  let response = localStorage.getItem("jwt")
    ? localStorage.getItem("jwt")
    : null;
  return response;
};

const getPayloadToken = () => {
  const token = getToken();
  if (token != null) {
    return jwt.decode(token);
  } else {
    return;
  }
};

module.exports = {
  verifyExistingToken,
  setToken,
  removeToken,
  getToken,
  getPayloadToken,
};
