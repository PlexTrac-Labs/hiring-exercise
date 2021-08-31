import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { LoginComponent } from "./components/Login/Login";
import {
  AuthService,
  IAuthService
} from "./services/Authentication/Authentication";
import { UsersList } from "./components/UsersList/UserList";
import { User } from "./models/User/User";
import { IUserService, UserService } from "./services/User/User";
import { UpdateUser } from "./components/UpdateUser/UpdateUser";
import { Button } from "@material-ui/core";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { PasswordReset } from "./components/PasswordReset/PasswordReset";
import { Signout } from "./components/Signout/Signout";

export const apiBaseUrl: string = "http://localhost:5000";

export interface IContext {
  authService: IAuthService;
  userService: IUserService;
  user?: User;
  getAccessToken(): string;
  setAccessToken(token: string): void;
}

const Context: IContext = {
  authService: new AuthService(apiBaseUrl),
  userService: new UserService(apiBaseUrl),
  getAccessToken(): string {
    return sessionStorage.getItem("accessToken") ?? "";
  },
  setAccessToken(token: string): void {
    sessionStorage.setItem("accessToken", token);
  }
};

export const Ctx = React.createContext<IContext>({} as IContext);

const App: React.FC = () => {
  document.body.style.backgroundColor = "dodgerblue";
  const [token, setToken] = useState<string>(Context.getAccessToken());

  if (!token) {
    return <LoginComponent setToken={setToken} />;
  }

  return (
    <div className="App">
      <Ctx.Provider value={Context}>
        <BrowserRouter>
          <div className="top-bar">
            <Link to="/">
              <Button className="home-btn" variant="outlined">
                Home
              </Button>
            </Link>
            <Link to="/signout">
              <Button className="sign-out-btn" variant="contained">
                Sign out
              </Button>
            </Link>
          </div>
          <Switch>
            <Route exact path="/">
              <UsersList />
            </Route>
            <Route exact path="/login">
              <LoginComponent setToken={setToken} />
            </Route>
            <Route exact path="/updateuser/:id">
              <UpdateUser />
            </Route>
            <Route exact path="/user/:id">
              <UserDetails></UserDetails>
            </Route>
            <Route exact path="/passwordreset">
              <PasswordReset></PasswordReset>
            </Route>
            <Route exact path="/signout">
              <Signout setToken={setToken}></Signout>
            </Route>
          </Switch>
          <div className="password-reset-container">
            <p>
              Click <Link to="/passwordreset">here</Link> to reset password
            </p>
          </div>
        </BrowserRouter>
      </Ctx.Provider>
    </div>
  );
};

export default App;
