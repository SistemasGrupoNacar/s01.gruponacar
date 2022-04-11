import { createRouter, createWebHistory } from "vue-router";

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
        path: "producciones",
        name: "Producciones",
        component: () => import("../views/Producciones.vue"),
      },
      {
        path: "movimientos/ventas",
        name: "Ventas",
        component: () => import("../views/Ventas.vue"),
      },
      {
        path: "producciones/detalle",
        name: "DetalleProduccion",
        component: () => import("../views/DetalleProduccion.vue"),
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
      {
        path: "lugares",
        name: "Lugares",
        component: () => import("../views/Lugares.vue"),
      },
      {
        path: "jornadas",
        name: "Jornadas",
        component: () => import("../views/Jornadas.vue"),
      },
      {
        path: "jornadas/nueva",
        name: "NuevaJornada",
        //component: () => import("../views/NuevoComponentes/NuevaJornada.vue"),
      },

      {
        path: "empleados",
        name: "Empleados",
        component: () => import("../views/Empleados.vue"),
      },

      {
        path: "empleados/nuevo",
        name: "NuevoEmpleado",
        component: () => import("../views/NuevoComponentes/NuevoEmpleado.vue"),
      },
      {
        path: "usuarios",
        name: "Usuarios",
        component: () => import("../views/Usuarios.vue"),
      },
      {
        path: "salarios",
        name: "Salarios",
        component: () => import("../views/Salarios.vue"),
      },
    ],
  },
  {
    path: "/inventario/productos/listado",
    name: "ListadoProductos",
    component: () => import("../views/ListadoComponentes/ListadoProductos.vue"),
  },
  {
    path: "/inventario/insumos/listado",
    name: "ListadoInsumos",
    component: () => import("../views/ListadoComponentes/ListadoInsumos.vue"),
  },
  {
    path: "/inventario/nuevo-gasto-insumo/",
    name: "NuevoGastoInsumo",
    component: () => import("../views/NuevoComponentes/NuevoGastoInsumo.vue"),
  },
  {
    path: "/jornadas/listado",
    name: "ListadoJornadas",
    component: () => import("../views/ListadoComponentes/ListadoJornadas.vue"),
  },
  {
    path: "/empleados/listado",
    name: "ListadoEmpleados",
    component: () => import("../views/ListadoComponentes/ListadoEmpleados.vue"),
  },
  {
    path: "/salarios/listado",
    name: "ListadoSalarios",
    component: () => import("../views/ListadoComponentes/ListadoSalarios.vue"),
  },
  {
    path: "/empleados/detalle-nuevo",
    name: "DetalleNuevoEmpleado",
    props: true,
    component: () =>
      import("../views/DetalleComponentes/EmpleadoDetalleComponente.vue"),
  },
  {
    path: "/movimientos/ventas/nueva",
    name: "NuevaVenta",
    component: () => import("../views/NuevoComponentes/NuevaVenta.vue"),
  },
  {
    path: "/producciones/nueva",
    name: "NuevaProduccion",
    component: () => import("../views/NuevoComponentes/NuevaProduccion.vue"),
  },
  {
    path: "/salarios/nuevo",
    name: "NuevoSalario",
    component: () => import("../views/NuevoComponentes/NuevoSalario.vue"),
  },
  {
    path: "/usuarios/nuevo",
    name: "NuevoUsuario",
    component: () => import("../views/NuevoComponentes/NuevoUsuario.vue"),
  },
  {
    path: "/empleados/nuevo",
    name: "NuevoEmpleado",
    component: () => import("../views/NuevoComponentes/NuevoEmpleado.vue"),
  },
  {
    path: "/movimientos/ventas/editar/:id",
    name: "EditarVenta",
    component: () => import("../views/EditarComponentes/EditarVenta.vue"),
  },
  {
    path: "/usuarios/editar/:id",
    name: "EditarUsuario",
    component: () => import("../views/EditarComponentes/EditarUsuario.vue"),
  },
  {
    path: "/jornadas/nuevo",
    name: "NuevaJornada",
    component: () => import("../views/NuevoComponentes/NuevaJornada.vue"),
  },
  {
    path: "/login",
    name: "InicioSesion",
    component: () => import("../views/InicioSesion.vue"),
    props: true,
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
    next();
  } else {
    next("/login"); // go to '/login';
  }
}

export default router;
