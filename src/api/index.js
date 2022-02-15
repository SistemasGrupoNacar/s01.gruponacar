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

// Obtener todos los productos
async function obtenerTodosProductos() {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/products/all")
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
  return new Promise((resolve, reject) => {
    axios
      .get(API_URI + "/products/")
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

export default {
  iniciarSesion,
  verificarToken,
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
  eliminarDetalleVenta,
  obtenerVentas,
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
  crearProduccion,
  cambiarContrasena,
  obtenerDatosPanel,
};
