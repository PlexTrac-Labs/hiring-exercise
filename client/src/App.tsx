import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { LoginComponent } from "./components/Login/Login";
import { AuthService } from "./services/Authentication/Authentication";
import { UsersList } from "./components/UsersList/UserList";
import { UpdateUser } from "./components/UpdateUser/UpdateUser";
import { Button } from "@material-ui/core";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { PasswordReset } from "./components/PasswordReset/PasswordReset";
import { Signout } from "./components/Signout/Signout";
import { IContext } from "./util/Context";
import { UserService } from "./services/User/User";
import { getAccessToken } from "./util/Token";

export const apiBaseUrl: string = process.env.REACT_APP_API_URL ?? "";

const Context: IContext = {
  authService: new AuthService(apiBaseUrl),
  userService: new UserService(apiBaseUrl)
};

export const Ctx = React.createContext<IContext>({} as IContext);

const App: React.FC = () => {
  document.body.style.backgroundColor = "dodgerblue";
  const [token, setToken] = useState<string>(getAccessToken());

  console.log("url: ", apiBaseUrl);

  if (!token) {
    return (
      <Ctx.Provider value={Context}>
        <LoginComponent setToken={setToken} />
      </Ctx.Provider>
    );
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
