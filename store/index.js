import { createStore } from "vuex";
import axios from "axios";

let base = "http://localhost:5000/";

let api = axios.create({
  baseURL: base,
  timeout: 3000
});

const store = createStore({
  state: {
    users: [],
    isAuthenticated: true
  },
  getters: {
    users: state => {
      return state.users;
    },
    authenticated: state => {
      return state.isAuthenticated;
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    async listUsers({ commit }) {
      try {
        const response = await api.get("user");
        commit("setUsers", response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

export default store;
