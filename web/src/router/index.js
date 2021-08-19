import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: require("@/views/Login").default
  },
  {
    path: "/landing",
    name: "Landing",
    component: require("@/views/Landing").default
  },
  {
    path: "/users",
    name: "Users",
    component: require("@/views/Users").default
  }
];

const router = new VueRouter({
  routes
});

export default router;
