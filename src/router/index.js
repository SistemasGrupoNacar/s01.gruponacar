import { createRouter, createWebHistory } from "vue-router";
import api from "@/api/index.js";

const routes = [
  {
    path: "/",
    name: "EnrutadorPrincipal",
    beforeEnter: verifyLoggedUser,
    component: () => import("../views/EnrutadorPrincipal.vue"),
    children: [
      {
        path: "",
        name: "Inicio",
        component: () => import("../views/Inicio.vue"),
      },
      {
        // Redireccion a la ruta de inicio
        path: "home",
        redirect: "/",
      },
      {
        path: "perfil",
        name: "Perfil",
        component: () => import("../views/Perfil.vue"),
      },
      {
        path: "perfil/cambiar-contrasena",
        name: "CambiarContrasena",
        component: () =>
          import("../views/EditarComponentes/EditarContrasena.vue"),
      },
      {
        path: "movimientos",
        name: "Movimientos",
        component: () => import("../views/Perfil.vue"),
      },
      {
        path: "inventario/productos",
        name: "Productos",
        component: () => import("../views/Productos.vue"),
      },
      {
        path: "inventario/insumos",
        name: "Insumos",
        component: () => import("../views/Insumos.vue"),
      },
      {
        path: "inventario/insumos/nuevo-ingreso",
        name: "NuevoIngresoInsumo",
        component: () =>
          import("../views/NuevoComponentes/NuevoIngresoInsumo.vue"),
      },
      {
        path: "inventario/productos/nuevo-ingreso",
        name: "NuevoIngresoProducto",
        component: () =>
          import("../views/NuevoComponentes/NuevoIngresoProducto.vue"),
      },
      {
        path: "inventario/productos/nuevo",
        name: "NuevoProducto",
        component: () => import("../views/NuevoComponentes/NuevoProducto.vue"),
      },
      {
        path: "inventario/insumos/nuevo",
        name: "NuevoInsumo",
        component: () => import("../views/NuevoComponentes/NuevoInsumo.vue"),
      },
      {
        path: "inventario/insumos/historial",
        name: "HistorialIngresoInsumo",
        component: () =>
          import("../views/HistorialComponentes/HistorialIngresoInsumo.vue"),
      },
      {
        path: "inventario/productos/historial",
        name: "HistorialIngresoProducto",
        component: () =>
          import("../views/HistorialComponentes/HistorialIngresoProducto.vue"),
      },
      {
        path: "inventario/productos/listado",
        name: "ListadoProductos",
        component: () =>
          import("../views/ListadoComponentes/ListadoProductos.vue"),
      },
      {
        path: "inventario/insumos/listado",
        name: "ListadoInsumos",
        component: () =>
          import("../views/ListadoComponentes/ListadoInsumos.vue"),
      },
      {
        path: "producciones",
        name: "Producciones",
        component: () => import("../views/Producciones.vue"),
      },
      {
        path: "producciones/nuevo-gasto-insumo/:id",
        name: "NuevoGastoInsumo",
        component: () =>
          import("../views/NuevoComponentes/NuevoGastoInsumo.vue"),
      },
      {
        path: "movimientos/ventas",
        name: "Ventas",
        component: () => import("../views/Ventas.vue"),
      },
      {
        path: "movimientos/ventas/nueva",
        name: "NuevaVenta",
        component: () => import("../views/NuevoComponentes/NuevaVenta.vue"),
      },
      {
        path: "movimientos/ventas/editar/:id",
        name: "EditarVenta",
        component: () => import("../views/EditarComponentes/EditarVenta.vue"),
      },
      {
        path: "producciones/detalle",
        name: "DetalleProduccion",
        component: () => import("../views/DetalleProduccion.vue"),
      },
      {
        path: "producciones/nueva",
        name: "NuevaProduccion",
        component: () =>
          import("../views/NuevoComponentes/NuevaProduccion.vue"),
      },
      {
        path: "movimientos/ingresos",
        name: "Ingresos",
        component: () => import("../views/Ingresos.vue"),
      },
      {
        path: "movimientos/egresos",
        name: "Egresos",
        component: () => import("../views/Egresos.vue"),
      },
      {
        path: "movimientos/extra",
        name: "MovimientosExtra",
        component: () => import("../views/MovimientosExtra.vue"),
      },
      {
        path: "movimientos/extra/nuevo",
        name: "NuevoMovimientoExtra",
        component: () =>
          import("../views/NuevoComponentes/NuevoMovimientoExtra.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "InicioSesion",
    component: () => import("../views/InicioSesion.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const DEFAULT_TITLE = "Grupo Nacar";
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

function verifyLoggedUser(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("jwt")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    // Probando si el token no esta vencido
    api
      .verificarToken()
      .then((response) => {
        if (response.status == 200) {
          next();
        }
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        next("/login");
      });
  } else {
    next("/login"); // go to '/login';
  }
}

export default router;
