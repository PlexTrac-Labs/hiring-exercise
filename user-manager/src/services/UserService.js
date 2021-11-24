import axios from "axios";
import { apiURL, ENDPOINTS } from "./constants";

function _getHeaders(token) {
  return {
    Authorization: `Bearer ${token}`
  };
}

class UserService {
  getUser(userId, token) {
    return axios
      .get(`${apiURL}${ENDPOINTS.USER}/${userId}`, {
        headers: _getHeaders(token)
      })
      .then(response => {
        return response;
      });
  }

  getAllUsers(token) {
    return axios
      .get(`${apiURL}${ENDPOINTS.USER}`, {
        headers: _getHeaders(token)
      })
      .then(response => {
        return response;
      });
  }

  createUser(userInfo) {
    return axios
      .post(`${apiURL}${ENDPOINTS.USER}`, { ...userInfo })
      .then(response => {
        return response;
      });
  }

  updateUser(userInfo, token) {
    return axios
      .put(`${apiURL}${ENDPOINTS.USER}/${userInfo.id}`, userInfo.user, {
        headers: _getHeaders(token)
      })
      .then(response => {
        return response;
      });
  }

  deleteUser(userId, token) {
    return axios
      .delete(`${apiURL}${ENDPOINTS.USER}/${userId}`, {
        headers: _getHeaders(token)
      })
      .then(response => {
        return response;
      });
  }

  changePassword(userInfo) {
    return axios
      .put(`${apiURL}${ENDPOINTS.PASSWORD}/${userInfo.id}`, {
        password: userInfo.password
      })
      .then(response => {
        return response;
      });
  }
}

export default new UserService();
