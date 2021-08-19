import Vue from "vue";
import Vuex from "vuex";

const themes = ["dark", "light"];
Vue.use(Vuex);

const localStorage = window.localStorage;

export default new Vuex.Store({
  state: {
    authed: Boolean(localStorage.getItem("authed")) || false,
    theme: localStorage.getItem("theme") || "dark",
    pageName: localStorage.getItem("pageName") || ""
  },
  mutations: {
    SET_THEME: function(state, theme) {
      if (!themes.includes(theme)) {
        console.error(`${theme} IS NOT A VALID THEME!`);
        return;
      }
      state.theme = theme;
      localStorage.setItem("theme", theme);
    },
    CHANGE_PAGE_NAME: function(state, pageName) {
      state.pageName = pageName;
      localStorage.setItem("pageName", pageName);
    },
    LOGIN: function(state) {
      state.authed = true;
      // TODO: should probably do something better than this, but this makes dev much nicer :)
      localStorage.setItem("authed", true);
    },
    LOGOUT: function(state) {
      state.authed = false;
      localStorage.setItem("authed", false);
    }
  },
  actions: {
    async getUsers({}, http) {
      // eslint-disable-line
      const res = await http({
        method: "get",
        url: "http://localhost:5000/user",
        data: {},
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
    }
  },
  modules: {}
});
