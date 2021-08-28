import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login/Login";
import {
  AuthService,
  IAuthService
} from "./services/Authentication/Authentication";
import { UsersList } from "./components/UsersList/UserList";
import { User } from "./models/User/User";

export const apiBaseUrl: string = "http://localhost:5000";

interface IContext {
  authService: IAuthService;
  user?: User;
}

const Context: IContext = {
  authService: new AuthService(apiBaseUrl)
};

export const Ctx = React.createContext<IContext | null>(Context);

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Ctx.Provider value={Context}>
      <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/users">
              <UsersList />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Ctx.Provider>
  );
};

export default App;
