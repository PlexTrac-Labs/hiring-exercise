//import Vue from 'vue';
// import Vuex from 'vuex';
import { createStore } from "vuex";
import axios from "axios";

// Vue.use(Vuex);

let base = "http://localhost:5000/";

let api = axios.create({
  baseURL: base,
  timeout: 3000
});

const store = createStore({
  state: {
    users: []
  },
  getters: {
    users: state => {
      return state.users;
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
