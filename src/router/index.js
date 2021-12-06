import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/middleware/auth";
import MainView from "../views/MainView.vue";
import LoginView from "../views/LoginView.vue";
import MovesView from "../views/MovesView.vue";
import DashboardView from "../views/DashboardView.vue";
import InventoryView from "../views/InventoryView.vue";
import ControlView from "../views/ControlView.vue";
import ProfileView from "../views/ProfileView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      title: "Inicio de Sesión - GrupoNacar",
    },
  },
  {
    path: "/",
    name: "Main",
    component: MainView,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: DashboardView,
        meta: {
          middleware: auth,
          title: "Dashboard - GrupoNacar",
        },
      },
      {
        path: "moves",
        name: "Moves",
        component: MovesView,
        meta: {
          middleware: auth,
          title: "Movimientos - GrupoNacar",
        },
      },
      {
        path: "inventory",
        name: "Inventory",
        component: InventoryView,
        meta: {
          middleware: auth,
          title: "Inventario - GrupoNacar",
        },
      },
      {
        path: "control",
        name: "Control",
        component: ControlView,
        meta: {
          middleware: auth,
          title: "Control - GrupoNacar",
        },
      },
      {
        path:"profile",
        name:"Profile",
        component: ProfileView,
        meta:{
          middleware: auth,
          title: "Perfil - GrupoNacar",
        }
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//router.replace({ path: "/", redirect: "*" });
//router.replace({ path: "/", redirect: "/dashboard" });
// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
