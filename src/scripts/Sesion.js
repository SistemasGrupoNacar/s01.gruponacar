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

module.exports = {
  verificarSesion,
};
