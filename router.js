import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./src/components/Home.vue";
import Login from "./src/components/Login.vue";
import UserView from "./src/components/UserView.vue";
import Reset from "./src/components/Reset.vue";
import store from "./store/index";

const router = createRouter({
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/user/:userId", name: "userView", component: UserView },
    { path: "/passwordReset/:userId", name: "passwordReset", component: Reset }
  ],
  history: createWebHashHistory(),
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !store.state.userId) next({ name: "login" });
  else next();
});

export default router;
