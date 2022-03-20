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

const obtenerDatosDeUsuario = async () => {
  let jwt = await getPayloadToken();
  const respuesta = jwt != null ? jwt : null;
  return respuesta;
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
  obtenerDatosDeUsuario,
  obtenerNombreDeUsuarioIniciales,
};
