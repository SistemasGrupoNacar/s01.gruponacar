const jwt = require("jsonwebtoken");

const setToken = async (token) => {
  return new Promise((resolve) => {
    localStorage.setItem("jwt", token);
    resolve();
  });
};

const removeToken = async () => {
  return new Promise((resolve) => {
    localStorage.removeItem("jwt");
    resolve();
  });
};

const getToken = async () => {
  return new Promise((resolve) => {
    resolve(localStorage.getItem("jwt"));
  });
};

const verifyExistingToken = async () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const getPayloadToken = async () => {
  const token = await getToken();
  if (token != null) {
    return jwt.decode(token);
  } else {
    return;
  }
};
module.exports = {
  setToken,
  removeToken,
  getToken,
  verifyExistingToken,
  getPayloadToken,
};
