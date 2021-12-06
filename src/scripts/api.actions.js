import axios from "axios";
import URL from "@/scripts/api.config.js";
import { getToken } from "@/scripts/token.actions.js";

//funcion para configurar el token como header
function configApi() {
  let token = getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
}

// funcion para el inicio de sesion
async function onLogin(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(URL + "/login", data)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function getRequest() {
  return new Promise((resolve, reject) => {
    axios
      .get(URL + "/requests", configApi())
      .then((response) => resolve(response))
      .catch((err) => reject(Error(err)));
  });
}

export default {
  onLogin,
  getRequest,
};
