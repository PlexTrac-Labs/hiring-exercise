import { createApp } from "vue";
//import Vue from 'vue';
import App from "./App.vue";
import store from "../store/index";

createApp(App)
  .use(store)
  .mount("#app");
// new Vue({
//     store,
//     render: h => h(App)
// }).$mount('#app');
