const { getPayloadToken } = require("@/scripts/Token.js");

const verificarSesion = (err) => {
  if (err.response.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
    return;
  } else if (err.response.status === 403) {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
    return;
  }
  return;
};

const obtenerNombreDeUsuario = async () => {
  let jwt = await getPayloadToken();
  if (jwt != null) {
    return `${jwt.firstName.split(" ")[0]} ${jwt.lastName.split(" ")[0]}`;
  } else {
    return null;
  }
};

const obtenerNombreDeUsuarioIniciales = async () => {
  let jwt = await getPayloadToken();
  if (jwt != null) {
    return `${jwt.firstName.slice(" ")[0]}${jwt.lastName.slice(" ")[0]}`;
  } else {
    return null;
  }
};

module.exports = {
  verificarSesion,
  obtenerNombreDeUsuario,
  obtenerNombreDeUsuarioIniciales,
};
