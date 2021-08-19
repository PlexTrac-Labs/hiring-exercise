import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;

new Vue({
  store,
  vuetify,
  render: h => h(App),
  router,
  template: "<App/>"
}).$mount("#app");
