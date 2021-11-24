import axios from "axios";
import router from "../router";
import { apiURL, ENDPOINTS } from "./constants";

class AuthService {
  authenticate(credentials) {
    return axios
      .post(`${apiURL}${ENDPOINTS.AUTHENTICATE}`, {
        username: credentials.username,
        password: credentials.password
      })
      .then(response => {
        if (response.data.auth_token) {
          localStorage.setItem("jwt", response.data.auth_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response;
      });
  }

  logout() {
    return new Promise(res => {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      router.push("/");
      res("Success");
    });
  }
}

export default new AuthService();
