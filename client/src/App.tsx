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

export const apiBaseUrl: string = "http://localhost:5000";

interface IContext {
  authService: IAuthService;
  userService: IUserService;
  user?: User;
}

const Context: IContext = {
  authService: new AuthService(apiBaseUrl),
  userService: new UserService(apiBaseUrl)
};

export const Ctx = React.createContext<IContext>(Context);

const App: React.FC = () => {
  document.body.style.backgroundColor = "dodgerblue";
  const [token, setToken] = useState<string>("");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Ctx.Provider value={Context}>
      <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <UsersList />
            </Route>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Ctx.Provider>
  );
};

export default App;
