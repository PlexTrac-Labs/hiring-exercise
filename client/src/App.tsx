import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login/Login";
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

export const apiBaseUrl: string = "http://localhost:5000";

interface IContext {
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

export const Ctx = React.createContext<IContext>(Context);

const App: React.FC = () => {
  document.body.style.backgroundColor = "dodgerblue";
  const [token, setToken] = useState<string>(Context.getAccessToken());

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const signout = () => {
    Context.user = undefined;
    Context.setAccessToken("");
    setToken("");
  };

  return (
    <div className="App">
      <Ctx.Provider value={Context}>
        <div className="top-bar">
          <Button
            className="sign-out-btn"
            variant="contained"
            onClick={() => signout()}
          >
            Sign out
          </Button>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <UsersList />
            </Route>
            <Route exact path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route exact path="/updateuser/:id">
              <UpdateUser />
            </Route>
            <Route exact path="/user/:id">
              <UserDetails></UserDetails>
            </Route>
          </Switch>
        </BrowserRouter>
      </Ctx.Provider>
    </div>
  );
};

export default App;
