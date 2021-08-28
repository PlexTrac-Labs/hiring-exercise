import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Ctx } from "../../App";

interface Props {
  setToken: Dispatch<SetStateAction<string>>;
}

export const Login: React.FC<Props> = props => {
  const ctx = React.useContext(Ctx);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("here: ", ctx);
    e.preventDefault();
    await ctx?.authService
      .Login({
        Username: username,
        Password: password
      })
      .then(res => {
        props.setToken(res.auth_token);
        ctx.user = res.user;
      });
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
