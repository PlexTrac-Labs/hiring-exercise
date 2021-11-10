import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import AppContainer from "../components/AppContainer";
import {
  AuthContext,
  selectIsAuthenticated,
  LoginPayload,
  axiosInstance,
  AuthState,
  actionAuthSuccess,
  actionAuthFail,
  selectAuthError
} from "../components/AuthContext";
import ButtonLogin from "../components/ButtonLogin";
import ButtonSignUp from "../components/ButtonSignUp";
import TextFieldBase from "../components/TextFieldBase";

const Login: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const dispatch = auth?.dispatch;
  const isAuthenticated = auth ? selectIsAuthenticated(auth.state) : false;
  const error = auth ? selectAuthError(auth.state) : undefined;

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const [form, setForm] = React.useState<LoginPayload>({
    username: "",
    password: ""
  });

  const login = (f: LoginPayload) => {
    axiosInstance()
      .post("/authenticate", f)
      .then(r => r.data as AuthState)
      .then(r => {
        if (dispatch) {
          dispatch(actionAuthSuccess(r));
        }
      })
      .catch(() => {
        if (dispatch) {
          dispatch(actionAuthFail("Username or Password incorrect"));
        }
      });
  };

  return (
    <AppContainer
      maxWidth="xs"
      style={{ marginTop: "20vh", textAlign: "center" }}
    >
      <Typography variant="h4" style={{ margin: "20px" }}>
        Hiring Exercise
      </Typography>

      <TextFieldBase
        label="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <TextFieldBase
        label="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
        value={form.password}
        error={error ? true : false}
        helperText={error}
        type="password"
      />
      <ButtonLogin onClick={() => login(form)} style={{ marginTop: "15px" }} />
      <Typography variant="h6" color="darkgrey">
        {" "}
        OR{" "}
      </Typography>
      <ButtonSignUp onClick={() => navigate("/sign-up")} />
    </AppContainer>
  );
};
export default Login;
