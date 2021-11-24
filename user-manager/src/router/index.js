import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../components/Welcome.vue";
import Dashboard from "../components/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("jwt");

  if (authRequired && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
