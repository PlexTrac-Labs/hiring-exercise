import { createStore } from "vuex";
import axios from "axios";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

let base = "http://localhost:5000/";

let api = axios.create({
  baseURL: base,
  timeout: 3000
});

const store = createStore({
  state: {
    users: [],
    userId: "",
    user: {}
  },
  getters: {
    users: state => {
      return state.users;
    },
    user: state => {
      return state.user;
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUserId(state, data) {
      state.userId = data.user._id;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    // Get All
    async listUsers({ commit }) {
      try {
        const response = await api.get("user");
        commit("setUsers", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    // Get by Id
    async getUserById({ commit }, payload) {
      try {
        const response = await api.get("user/" + payload._id);
        commit("setUser", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    // Put
    async updateUser({ commit }, payload) {
      try {
        const response = await api.put("user/" + payload._id, {
          username: payload.username,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email
        });
        if (response) commit("setUser", payload);
      } catch (error) {
        console.log(error);
      }
    },
    // Login
    async authenticate({ commit }, payload) {
      try {
        const response = await api.post("authenticate", payload);
        commit("setUserId", response.data);
        if (response.data.user._id) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  plugins: [createPersistedState()]
});

export default store;
