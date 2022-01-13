import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/main.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

import es from "element-plus/es/locale/lang/es";
VueChartkick.configure({
  language: "es",
});

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: es,
  })
  .use(VueChartkick)
  .mount("#app");
