import axios from "axios";
import API_URI from "@/api/config.js";
import tokenActions from "@/scripts/Token.js";

// Iniciar sesion
async function iniciarSesion(credenciales) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/login", credenciales)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Verificar si el token no ha expirado
async function verificarToken() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/login", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener un producto en especifico
async function obtenerProducto(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/products/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todos los productos
async function obtenerTodosProductos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/products/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener productos disponibles
async function obtenerProductos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/products", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener primeros 5 productos
async function obtenerPrimerosProductos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/products?limit=5")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Cambiar la disponibilidad de un producto
async function cambiarDisponibilidadProducto(id, disponibilidad) {
  return new Promise((resolve, reject) => {
    axios
      .put(API_URI + "/products/" + id + "/available/" + disponibilidad)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar un producto
async function eliminarProducto(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/products/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear producto
async function crearProducto(producto) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/products", producto)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todos los insumos
async function obtenerTodosInsumos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/inventoryProducts/all")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener insumos disponibles
async function obtenerInsumos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/inventoryProducts")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
// Obtener primeros 5 insumos
async function obtenerPrimerosInsumos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/inventoryProducts?limit=5")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todos historial de cosecha
async function obtenerTodosHistorialCosecha() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/harvest")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener primeros 5 historial de cosecha
async function obtenerPrimerosHistorialCosecha() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/harvest?limit=5")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todas las producciones en curso
async function obtenerProduccionesEnProgreso() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/productions")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todas las producciones
async function obtenerTodasProducciones() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/productions/all")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear cosecha de producto
async function crearCosecha(ingreso) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/harvest", ingreso)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar Historial de cosecha
async function eliminarHistorialCosecha(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/harvest/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener primeros 5 historial de entrada de insumos
async function obtenerPrimerosHistorialEntradaInsumos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/inventoryEntries?limit=5")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todos historial de entrada de insumos
async function obtenerTodosHistorialEntradaInsumos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/inventoryEntries")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar un insumo
async function eliminarInsumo(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/inventoryProducts/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Cambiar disponibilidad de un insumo
async function cambiarDisponibilidadInsumo(id, disponibilidad) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        API_URI + "/inventoryProducts/" + id + "/available/" + disponibilidad
      )
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear insumo
async function crearInsumo(insumo) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/inventoryProducts", insumo)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear ingreso de insumo
async function crearIngresoInsumo(ingreso) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/inventoryEntries", ingreso)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar entrada de insumo
async function eliminarEntradaInsumo(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/inventoryEntries/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear Venta
async function crearVenta(venta) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/sales", venta)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Cancelar Venta
async function cancelarVenta(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/sales/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener venta específica
async function obtenerVenta(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/sales/unique/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Agregar detalle de venta
async function crearDetalleVenta(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/detailSales", data)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar detalle de venta
async function eliminarDetalleVenta(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/detailSales/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener ventas
async function obtenerVentas() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/sales")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener solo las ventas de hoy
async function obtenerVentasHoy() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/sales/today")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener primeras 5 ventas
async function obtenerPrimerosVentas() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/sales?limit=5")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener ventas pendientes
async function obtenerVentasPendientes() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/sales/pending")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Finalizar venta (cambiar pending a false)
async function finalizarVenta(id) {
  return new Promise((resolve, reject) => {
    axios
      .put(API_URI + "/sales/pending/" + id + "/false")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todas las ventas con rango de fechas
async function obtenerVentasTodasFecha(fechaInicio, fechaFin) {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/sales/" + fechaInicio + "/" + fechaFin + "/all")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener las ventas con rango de fechas
async function obtenerVentasFecha(fechaInicio, fechaFin) {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/sales/" + fechaInicio + "/" + fechaFin)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todas las ventas sin rango de fechas
async function obtenerVentasTodas() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/sales/all")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener egresos
async function obtenerEgresos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/economy/egress")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener egresos con rango de fechas
async function obtenerEgresosFecha(fechaInicio, fechaFin) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        API_URI +
          "/economy/egress?startDate=" +
          fechaInicio +
          "&endDate=" +
          fechaFin
      )
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener ingresos
async function obtenerIngresos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/economy/ingress")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener ingresos con rango de fechas
async function obtenerIngresosFecha(fechaInicio, fechaFin) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        API_URI +
          "/economy/ingress?startDate=" +
          fechaInicio +
          "&endDate=" +
          fechaFin
      )
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener los tipos de movimientos
async function obtenerTiposMovimientos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/typeMoves")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Agregar movimiento extra
async function crearMovimientoExtra(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/extraMoves", data)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todos los movimientos extras
async function obtenerTodosMovimientosExtra() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/extraMoves")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar movimiento extra
async function eliminarMovimientoExtra(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/extraMoves/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Finalizar produccion
async function finalizarProduccion(id, fecha) {
  return new Promise((resolve, reject) => {
    axios
      .put(API_URI + "/productions/" + id + "/finished", {
        end_date: fecha,
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Reanudar produccion
async function reanudarProduccion(id) {
  return new Promise((resolve, reject) => {
    axios
      .put(API_URI + "/productions/" + id + "/inProgress")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear costo de produccion
async function crearCostoProduccion(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/productionCosts", data)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener los lugares
async function obtenerLugares() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/places")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Cambiar disponibilidad lugar
async function cambiarDisponibilidadLugar(id, disponibilidad) {
  return new Promise((resolve, reject) => {
    axios
      .put(API_URI + "/places/" + id + "/" + disponibilidad)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener todos los lugares
async function obtenerLugaresTodos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/places/all")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar lugar
async function eliminarLugar(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/places/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear lugar
async function crearLugar(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/places", data)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear nueva produccion
async function crearProduccion(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/productions", data)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Cambiar contraseña de usuario
async function cambiarContrasena(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .put(API_URI + "/users/change-password", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener datos del panel
async function obtenerDatosPanel() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/panel")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener los ultimos empleados en entrar a la empresa
async function obtenerUltimosEmpleados() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/employees/")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtiene los empleados de la empresa
async function obtenerEmpleados() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/employees")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtiene todos los empleados
async function obtenerEmpleadosTodos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/employees/all")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar empleado
async function eliminarEmpleado(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_URI + "/employees/" + id)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Cambiar estado de empleado
async function cambiarEstadoEmpleado(id, estado) {
  return new Promise((resolve, reject) => {
    axios
      .put(API_URI + "/employees/" + id + "/status/" + estado)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear empleado
async function crearEmpleado(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URI + "/employees", data)
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener posiciones o cargos
async function obtenerPosiciones() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/positions")
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Cambiar contraseña de empleado
async function cambiarContrasenaEmpleado(username, data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .put(API_URI + "/users/" + username + "/change-password", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener ultimas jornadas
async function obtenerUltimasJornadas() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/journeys/last", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener jornadas
async function obtenerJornadas() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/journeys", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener jornadas en proceso
async function obtenerJornadasEnProceso() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/journeys/in-progress", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar jornada
async function eliminarJornada(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .delete(API_URI + "/journeys/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Cambiar avatar de usuario de empleado
async function cambiarAvatar(username, data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    console.log(data);
    axios
      .put(API_URI + "/users/" + username + "/change-avatar", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener ultimos usuarios
async function obtenerUltimosUsuarios() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/users/last", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener los usuarios completos
async function obtenerUsuarios() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener un usuario especifico
async function obtenerUsuario(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/users/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar usuario
async function eliminarUsuario(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .delete(API_URI + "/users/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener roles
async function obtenerRoles() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/roles", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//Verificar nombre de usuario
async function verificarUsuario(username) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .post(API_URI + "/users/verify-username", username, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Crear usuario
async function crearUsuario(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .post(API_URI + "/users", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener salarios
async function obtenerSalarios() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/salaries", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener ultimos salarios
async function obtenerUltimosSalarios() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/salaries/last", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Agregar salario
async function crearSalario(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .post(API_URI + "/salaries", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Eliminar salario
async function eliminarSalario(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .delete(API_URI + "/salaries/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Obtener el total de salarios del mes de un empleado especifico
async function obtenerTotalSalarios(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      reject({
        message: "Token no encontrado",
      });
    }
    axios
      .get(API_URI + "/salaries/total/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default {
  iniciarSesion,
  verificarToken,
  obtenerProducto,
  obtenerTodosProductos,
  obtenerProductos,
  obtenerPrimerosProductos,
  cambiarDisponibilidadProducto,
  eliminarProducto,
  crearProducto,
  obtenerTodosInsumos,
  obtenerInsumos,
  obtenerPrimerosInsumos,
  obtenerPrimerosHistorialCosecha,
  obtenerTodosHistorialCosecha,
  obtenerProduccionesEnProgreso,
  obtenerTodasProducciones,
  crearCosecha,
  eliminarHistorialCosecha,
  obtenerPrimerosHistorialEntradaInsumos,
  obtenerTodosHistorialEntradaInsumos,
  eliminarInsumo,
  cambiarDisponibilidadInsumo,
  crearInsumo,
  crearIngresoInsumo,
  eliminarEntradaInsumo,
  crearVenta,
  cancelarVenta,
  crearDetalleVenta,
  obtenerVenta,
  obtenerVentasHoy,
  eliminarDetalleVenta,
  finalizarVenta,
  obtenerVentas,
  obtenerVentasPendientes,
  obtenerVentasTodasFecha,
  obtenerVentasFecha,
  obtenerPrimerosVentas,
  obtenerVentasTodas,
  obtenerEgresos,
  obtenerEgresosFecha,
  obtenerIngresos,
  obtenerIngresosFecha,
  obtenerTiposMovimientos,
  crearMovimientoExtra,
  obtenerTodosMovimientosExtra,
  eliminarMovimientoExtra,
  finalizarProduccion,
  reanudarProduccion,
  crearCostoProduccion,
  obtenerLugares,
  obtenerLugaresTodos,
  crearLugar,
  eliminarLugar,
  cambiarDisponibilidadLugar,
  crearProduccion,
  cambiarContrasena,
  obtenerDatosPanel,
  obtenerUltimosEmpleados,
  obtenerEmpleados,
  obtenerEmpleadosTodos,
  eliminarEmpleado,
  cambiarEstadoEmpleado,
  crearEmpleado,
  obtenerPosiciones,
  cambiarContrasenaEmpleado,
  obtenerJornadas,
  obtenerUltimasJornadas,
  obtenerJornadasEnProceso,
  eliminarJornada,
  cambiarAvatar,
  obtenerUltimosUsuarios,
  obtenerUsuarios,
  obtenerUsuario,
  eliminarUsuario,
  obtenerRoles,
  verificarUsuario,
  crearUsuario,
  obtenerUltimosSalarios,
  obtenerSalarios,
  crearSalario,
  eliminarSalario,
  obtenerTotalSalarios,
};
