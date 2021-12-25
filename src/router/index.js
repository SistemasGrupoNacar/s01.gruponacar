import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "EnrutadorPrincipal",
    component: () => import("../views/EnrutadorPrincipal.vue"),
    children: [
      {
        path: "",
        name: "Inicio",
        component: () => import("../views/Inicio.vue"),
      },
      {
        path: "perfil",
        name: "Perfil",
        component: () => import("../views/Perfil.vue"),
      },
      {
        path: "movimientos",
        name: "Movimientos",
        component: () => import("../views/Perfil.vue"),
      },
      {
        path: "inventario",
        name: "Inventario",
        component: () => import("../views/Inventario.vue"),
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

const DEFAULT_TITLE = 'Grupo Nacar';
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
