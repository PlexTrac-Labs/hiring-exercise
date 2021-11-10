import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import AppContainer from "../components/AppContainer";
import {
  actionAuthSuccess,
  AuthContext,
  AuthState,
  axiosInstance,
  LoginPayload,
  selectSignUpError
} from "../components/AuthContext";
import ButtonLogin from "../components/ButtonLogin";
import ButtonSignUp from "../components/ButtonSignUp";
import LoadingPopup from "../components/LoadingPopup";
import TextFieldBase from "../components/TextFieldBase";

const SignUp: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const dispatch = auth?.dispatch;
  const error = auth ? selectSignUpError(auth?.state) : undefined;

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : "/";

  //   useEffect(() => {
  //     if (auth?.auth_token) {
  //       navigate(from, { replace: true });
  //     }
  //   }, [auth?.auth_token, from, navigate]);

  //   const [form, setForm] = React.useState<LoginPayload>({
  //     username: "clint",
  //     password: "123456"
  //   });

  //   const login = (f: LoginPayload) => {
  //     auth?.authenticate(f);
  //   };

  const [signUpForm, setSignUpForm] = React.useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const [passwordError, setPasswordError] = React.useState("");

  const handleConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== signUpForm.password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const [loading, setloading] = React.useState<boolean>(false);
  const handleSignUp = () => {
    // setloading(true)
    axiosInstance()
      .post("/user", signUpForm)
      .then(r => r.data as AuthState)
      .then(r => (dispatch ? dispatch(actionAuthSuccess(r)) : null))
      .then(() => {
        setloading(false);
        navigate(from, { replace: true });
      })
      .catch(() => setloading(false));
  };

  return (
    <>
      <LoadingPopup loading={loading} />
      <AppContainer
        maxWidth="xs"
        style={{ marginTop: "15vh", textAlign: "center" }}
      >
        <Typography variant="h4" style={{ margin: "20px" }}>
          Hiring Exercise
        </Typography>

        <TextFieldBase
          label="Username"
          required
          value={signUpForm.username}
          onChange={e =>
            setSignUpForm({ ...signUpForm, username: e.target.value })
          }
        />
        <TextFieldBase
          label="Email"
          required
          value={signUpForm.email}
          onChange={e =>
            setSignUpForm({ ...signUpForm, email: e.target.value })
          }
        />
        <TextFieldBase
          label="First Name"
          required
          value={signUpForm.firstName}
          onChange={e =>
            setSignUpForm({ ...signUpForm, firstName: e.target.value })
          }
        />
        <TextFieldBase
          label="Last Name"
          required
          value={signUpForm.lastName}
          onChange={e =>
            setSignUpForm({ ...signUpForm, lastName: e.target.value })
          }
        />
        <TextFieldBase
          label="Password"
          required
          value={signUpForm.password}
          onChange={e =>
            setSignUpForm({ ...signUpForm, password: e.target.value })
          }
          type="password"
          error={passwordError ? true : false}
        />
        <TextFieldBase
          label="Confirm Password"
          type="password"
          required
          onChange={e => handleConfirmPassword(e)}
          error={passwordError ? true : false}
          helperText={passwordError}
        />
        {error ? <Typography color="red">{Error}</Typography> : <></>}
        <ButtonSignUp
          onClick={() => handleSignUp()}
          style={{
            backgroundColor: "darkgray",
            border: "none",
            marginTop: "15px"
          }}
        />
        <Typography variant="h6" color="darkgrey">
          {" "}
          OR{" "}
        </Typography>
        <ButtonLogin
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "transparent",
            border: "solid 1px darkgrey"
          }}
        />
      </AppContainer>
    </>
  );
};
export default SignUp;
