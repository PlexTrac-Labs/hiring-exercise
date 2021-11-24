import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { AUTH_STATES } from "@/store/constants";
import router from "@/router";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { apiURL, ENDPOINTS } from "@/services/constants";

Vue.use(Vuex);
Vue.config.devtools = true;

function _requestFailed(response) {
  return Object.entries(response.data).length === 0 ||
    response.data.status === "error"
    ? true
    : false;
}

function _generateError(error) {
  let message = "";
  const status_code = error.status;

  if (status_code && status_code === 400) {
    message = error.data.error;
  }

  if (status_code && status_code === 401) {
    message =
      "Something is wrong with the credentials you provided. Please try again";
  }

  if (status_code & (status_code === 403)) {
    message = "User provided was not found. Please try again";
  }

  return message;
}

export default new Vuex.Store({
  state: {
    users: [
      {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        birthYear: "",
        favoriteColor: "#7F50F1FF"
      }
    ],
    currentUser: {},
    isLoading: false,
    error: null
  },
  mutations: {
    setAuthToken(state, value) {
      state.authToken = value;
    },
    setAuthState(state, value) {
      state.authState = value;
    },
    setCurrentUser(state, value) {
      state.currentUser = value;
    },
    setUsers(state, value) {
      state.users = value;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    setError(state, value) {
      state.error = value;
    }
  },
  actions: {
    async authenticate(context, credentials) {
      return new Promise((res, rej) => {
        context.commit("setIsLoading", true);
        AuthService.authenticate(credentials)
          .then(response => {
            if (_requestFailed(response)) {
              context.commit("setCurrentUser", {});
              context.commit("setAuthToken", null);
              context.commit("setAuthState", AUTH_STATES.FAILED);
              rej("Failed");
            } else {
              context.commit("setCurrentUser", response.data.user);
              context.commit("setAuthToken", response.data.auth_token);
              context.commit("setAuthState", AUTH_STATES.AUTHENTICATED);
              localStorage.setItem("jwt", response.data.auth_token);
              localStorage.setItem("user", JSON.stringify(response.data.user));
              router.push("/dashboard");
              res("Success");
            }
          })
          .catch(err => {
            const error_message = _generateError(err.response);
            context.commit("setError", _generateError(error_message));
            context.commit("setAuthState", AUTH_STATES.FAILED);
            rej(error_message);
          })
          .finally(context.commit("setIsLoading", false));
      });
    },
    async getUser(context, userId) {
      return new Promise((res, rej) => {
        context.commit("setIsLoading", true);
        UserService.getUser(userId, context.state.authToken).then(response => {
          _requestFailed(response) ? rej("Failed") : res("Success");
        });
      });
    },
    async getAllUsers() {
      // return new Promise((res, rej) => {
      //   context.commit("setIsLoading", true);
      //   UserService.getAllUsers(context.state.authToken)
      //     .then(response => {
      //       _requestFailed(response)
      //         ? rej("Failed")
      //         : context.commit("setUsers", response.data),
      //         res("Success");
      //     })
      //     .catch(err => {
      //       context.commit("setError", _generateError(err.response));
      //       console.log(err.message);
      //     })
      //     .finally(context.commit("setIsLoading", false));
      // });
    },
    async createUser(context, userInfo) {
      return new Promise((res, rej) => {
        context.commit("setIsLoading", true);
        UserService.createUser(userInfo)
          .then(response => {
            if (_requestFailed(response)) {
              rej("Failed");
            } else {
              const loggedInUser = localStorage.getItem("user");
              const authToken = localStorage.getItem("jwt");

              if (!loggedInUser && !authToken) {
                context.dispatch("authenticate", {
                  username: userInfo.username,
                  password: userInfo.password
                });
              }
              res("Success");
            }
          })
          .catch(err => {
            const error_message = _generateError(err.response);
            context.commit("setError", _generateError(error_message));
            rej(error_message);
          })
          .finally(context.commit("setIsLoading", false));
      });
    },
    async updateUser(context, userInfo) {
      return new Promise((res, rej) => {
        context.commit("setIsLoading", true);
        UserService.updateUser(userInfo, context.state.authToken)
          .then(response => {
            return _requestFailed(response) ? rej("Failed") : res("Success");
          })
          .catch(err => {
            const error_message = _generateError(err.response);
            context.commit("setError", _generateError(error_message));
            rej(error_message);
          })
          .finally(
            context.dispatch("getAllUsers"),
            context.commit("setIsLoading", false)
          );
      });
    },
    async deleteUser(context, userId) {
      return new Promise((res, rej) => {
        context.commit("setIsLoading", true);
        UserService.deleteUser(userId, context.state.authToken)
          .then(response => {
            if (_requestFailed(response)) {
              rej("Failed");
            } else {
              const updatedUserList = context.state.users.filter(
                user => user._id != userId
              );
              context.commit("setUsers", updatedUserList);

              const loggedInUser = JSON.parse(localStorage.getItem("user"));

              if (loggedInUser._id === userId) {
                context.dispatch("logout");
              }
              res("Success");
            }
          })
          .catch(err => {
            const error_message = _generateError(err.response);
            context.commit("setError", _generateError(error_message));
            rej(error_message);
          })
          .finally(
            context.dispatch("getAllUsers"),
            context.commit("setIsLoading", false)
          );
      });
    },
    async changePassword(context, userInfo) {
      return new Promise((res, rej) => {
        axios
          .put(`${apiURL}${ENDPOINTS.PASSWORD}/${userInfo.id}`, {
            password: userInfo.password
          })
          .then(response => {
            _requestFailed(response) ? rej("Failed") : res("Success");
          })
          .catch(err => {
            const error_message = _generateError(err.response);
            context.commit("setError", _generateError(error_message));
            rej(error_message);
          });
      });
    },
    async logout(context) {
      return AuthService.logout().then(
        context.commit("setAuthState", AUTH_STATES.INIT)
      );
    }
  }
});
