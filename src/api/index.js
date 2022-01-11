import axios from "axios";
import API_URI from "@/api/config.js";

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

export default {
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
};
