import Vue from "vue";
import App from "./App.vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
