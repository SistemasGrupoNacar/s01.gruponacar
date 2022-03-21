import axios from "axios";
import API_URI from "@/api/config.js";
import tokenActions from "@/scripts/Token.js";

function error401_403(error) {
  if (error.response.status == 401) {
    tokenActions.eliminarToken();
    window.location.href = "/login";
    return;
  }
  if (error.response.status == 403) {
    tokenActions.eliminarToken();
    window.location.href = "/login";
    return;
  }
  return;
}

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
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener un producto en especifico
async function obtenerProducto(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todos los productos
async function obtenerTodosProductos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener productos disponibles
async function obtenerProductos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener primeros 5 productos
async function obtenerPrimerosProductos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/products?limit=5", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Cambiar la disponibilidad de un producto
async function cambiarDisponibilidadProducto(id, disponibilidad) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .put(API_URI + "/products/" + id + "/available/" + disponibilidad, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar un producto
async function eliminarProducto(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/products/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear producto
async function crearProducto(producto) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/products", producto, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todos los insumos
async function obtenerTodosInsumos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/inventoryProducts/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener insumos disponibles
async function obtenerInsumos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/inventoryProducts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}
// Obtener primeros 5 insumos
async function obtenerPrimerosInsumos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/inventoryProducts?limit=5", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todos historial de cosecha
async function obtenerTodosHistorialCosecha() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/harvest", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener primeros 5 historial de cosecha
async function obtenerPrimerosHistorialCosecha() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/harvest?limit=5", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todas las producciones en curso
async function obtenerProduccionesEnProgreso() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/productions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todas las producciones
async function obtenerTodasProducciones() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/productions/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear cosecha de producto
async function crearCosecha(ingreso) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/harvest", ingreso, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar Historial de cosecha
async function eliminarHistorialCosecha(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/harvest/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener primeros 5 historial de entrada de insumos
async function obtenerPrimerosHistorialEntradaInsumos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/inventoryEntries?limit=5", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todos historial de entrada de insumos
async function obtenerTodosHistorialEntradaInsumos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/inventoryEntries", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar un insumo
async function eliminarInsumo(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/inventoryProducts/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Cambiar disponibilidad de un insumo
async function cambiarDisponibilidadInsumo(id, disponibilidad) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .put(
        API_URI + "/inventoryProducts/" + id + "/available/" + disponibilidad,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear insumo
async function crearInsumo(insumo) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/inventoryProducts", insumo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear ingreso de insumo
async function crearIngresoInsumo(ingreso) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/inventoryEntries", ingreso, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar entrada de insumo
async function eliminarEntradaInsumo(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/inventoryEntries/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear Venta
async function crearVenta(venta) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/sales", venta, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Cancelar Venta
async function cancelarVenta(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/sales/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener venta específica
async function obtenerVenta(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/sales/unique/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Agregar detalle de venta
async function crearDetalleVenta(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/detailSales", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar detalle de venta
async function eliminarDetalleVenta(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/detailSales/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener ventas
async function obtenerVentas() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/sales", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener solo las ventas de hoy
async function obtenerVentasHoy() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/sales/today", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener primeras 5 ventas
async function obtenerPrimerosVentas() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/sales?limit=5", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener ventas pendientes
async function obtenerVentasPendientes() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/sales/pending", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Finalizar venta (cambiar pending a false)
async function finalizarVenta(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .put(API_URI + "/sales/pending/" + id + "/false", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todas las ventas con rango de fechas
async function obtenerVentasTodasFecha(fechaInicio, fechaFin) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/sales/" + fechaInicio + "/" + fechaFin + "/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener las ventas con rango de fechas
async function obtenerVentasFecha(fechaInicio, fechaFin) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/sales/" + fechaInicio + "/" + fechaFin, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todas las ventas sin rango de fechas
async function obtenerVentasTodas() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/sales/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener egresos
async function obtenerEgresos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/economy/egress", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener egresos con rango de fechas
async function obtenerEgresosFecha(fechaInicio, fechaFin) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(
        API_URI +
          "/economy/egress?startDate=" +
          fechaInicio +
          "&endDate=" +
          fechaFin,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener ingresos
async function obtenerIngresos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/economy/ingress", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener ingresos con rango de fechas
async function obtenerIngresosFecha(fechaInicio, fechaFin) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(
        API_URI +
          "/economy/ingress?startDate=" +
          fechaInicio +
          "&endDate=" +
          fechaFin,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener los tipos de movimientos
async function obtenerTiposMovimientos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/typeMoves", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Agregar movimiento extra
async function crearMovimientoExtra(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/extraMoves", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todos los movimientos extras
async function obtenerTodosMovimientosExtra() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/extraMoves", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar movimiento extra
async function eliminarMovimientoExtra(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/extraMoves/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Finalizar produccion
async function finalizarProduccion(id, fecha) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .put(
        API_URI + "/productions/" + id + "/finished",
        {
          end_date: fecha,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Reanudar produccion
async function reanudarProduccion(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .put(API_URI + "/productions/" + id + "/inProgress", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear costo de produccion
async function crearCostoProduccion(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/productionCosts", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener los lugares
async function obtenerLugares() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/places", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Cambiar disponibilidad lugar
async function cambiarDisponibilidadLugar(id, disponibilidad) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .put(API_URI + "/places/" + id + "/" + disponibilidad, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener todos los lugares
async function obtenerLugaresTodos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/places/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar lugar
async function eliminarLugar(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/places/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear lugar
async function crearLugar(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/places", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear nueva produccion
async function crearProduccion(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/productions", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Cambiar contraseña de usuario
async function cambiarContrasena(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener datos del panel
async function obtenerDatosPanel() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/panel", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener los ultimos empleados en entrar a la empresa
async function obtenerUltimosEmpleados() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/employees/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtiene los empleados de la empresa
async function obtenerEmpleados() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/employees", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtiene todos los empleados
async function obtenerEmpleadosTodos() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/employees/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar empleado
async function eliminarEmpleado(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .delete(API_URI + "/employees/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Cambiar estado de empleado
async function cambiarEstadoEmpleado(id, estado) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .put(API_URI + "/employees/" + id + "/status/" + estado, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear empleado
async function crearEmpleado(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .post(API_URI + "/employees", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener posiciones o cargos
async function obtenerPosiciones() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
    }
    axios
      .get(API_URI + "/positions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Cambiar contraseña de empleado
async function cambiarContrasenaEmpleado(username, data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener ultimas jornadas
async function obtenerUltimasJornadas() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener jornadas
async function obtenerJornadas() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener jornadas en proceso
async function obtenerJornadasEnProceso() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar jornada
async function eliminarJornada(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Cambiar avatar de usuario de empleado
async function cambiarAvatar(username, data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener ultimos usuarios
async function obtenerUltimosUsuarios() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener los usuarios completos
async function obtenerUsuarios() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener un usuario especifico
async function obtenerUsuario(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar usuario
async function eliminarUsuario(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener roles
async function obtenerRoles() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

//Verificar nombre de usuario
async function verificarUsuario(username) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Crear usuario
async function crearUsuario(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener salarios
async function obtenerSalarios() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener ultimos salarios
async function obtenerUltimosSalarios() {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Agregar salario
async function crearSalario(data) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Eliminar salario
async function eliminarSalario(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
        reject(error);
      });
  });
}

// Obtener el total de salarios del mes de un empleado especifico
async function obtenerTotalSalarios(id) {
  const token = await tokenActions.getToken();
  return new Promise((resolve, reject) => {
    if (token == null) {
      window.location.href = "/login";
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
        if (error.response) {
          error401_403(error);
        }
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
