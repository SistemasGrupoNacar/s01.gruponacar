import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import LoginView from "../views/LoginView.vue";
import SalesView from "../views/SalesView.vue";
import DashboardView from "../views/DashboardView.vue";
import InventoryView from "../views/InventoryView.vue";
import ControlView from "../views/ControlView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
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
      },
      {
        path: "sales",
        name: "Sales",
        component: SalesView,
      },
      {
        path: "inventory",
        name: "Inventory",
        component: InventoryView,
      },
      {
        path: "control",
        name: "Control",
        component: ControlView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
