import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/main.css";
import "@/assets/index.scss";
import Vue3Geolocation from "vue3-geolocation";
import * as VueGoogleMaps from "vue3-google-map";

import ElementPlus from "element-plus";
//import "element-plus/dist/index.css";

import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

import es from "element-plus/es/locale/lang/es";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: es,
  })
  .use(VueChartkick)
  .use(Vue3Geolocation)
  .use(VueGoogleMaps, {
    load: {
      key: "",
    },
    installComponents: false,
  })
  .mount("#app");
