import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Ctx } from "../../App";
import { Button, TextField } from "@material-ui/core";
import "./Login.scss";
import { setAccessToken } from "../../util/Token";

interface Props {
  setToken: Dispatch<SetStateAction<string>>;
}

export const LoginComponent: React.FC<Props> = props => {
  const ctx = React.useContext(Ctx);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await ctx.authService
      .Login({
        username,
        password
      })
      .then(res => {
        props.setToken(res.auth_token);
        setAccessToken(res.auth_token);
        ctx.user = res.user;
      })
      .catch(_ => {
        setPassword("");
        setError("Login attempt failed. Please try again.");
      });
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form
        className="login-form"
        onSubmit={handleSubmit}
        onChange={() => setError("")}
      >
        <TextField
          label="Username"
          type="text"
          required={true}
          className="username-input"
          InputLabelProps={{
            className: "username-input"
          }}
          inputProps={{
            "data-testid": "username-input"
          }}
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={false}
        />
        <TextField
          label="Password"
          type="password"
          required={true}
          className="password-input"
          InputLabelProps={{
            className: "password-input"
          }}
          inputProps={{
            "data-testid": "password-input"
          }}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="error-container">
          {error && <p className="error-message">* {error}</p>}
        </div>
        <Button
          type="submit"
          className="login-btn"
          variant="outlined"
          data-testid="submit-btn"
        >
          Login
        </Button>
      </form>
    </div>
  );
};
