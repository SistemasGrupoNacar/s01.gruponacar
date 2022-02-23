const moment = require("moment");

//const fechaActual = new Date().toISOString();
const fechaActual = moment().format();

//Formatea la fecha recibiendo una fecha en formato ISO
const formatearFecha = (fecha) => {
  return moment(fecha);
};

module.exports = {
  fechaActual,
  formatearFecha,
};
