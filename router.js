import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./src/components/Home.vue";
import Login from "./src/components/Login.vue";
import store from "./store/index";

const router = createRouter({
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/login", name: "login", component: Login }
  ],
  history: createWebHashHistory(),
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !store.state.userId) next({ name: "login" });
  else next();
});

export default router;
