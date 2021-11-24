import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import store from "./store";
import router from "./router";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.prototype.$eventPool = new Vue();

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
