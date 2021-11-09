// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import AppContainer from "./components/AppContainer";
import AuthProvider from "./components/AuthContext";
import AuthRequired from "./components/AuthRequired";
import UserContextProvider from "./components/UserContext";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserCreate from "./pages/UserCreate";
import UserList from "./pages/UserList";
import UserPasswordReset from "./pages/UserPasswordReset";
import UserUpdate from "./pages/UserUpdate";
import UserView from "./pages/UserView";

function App() {
  return (
    <AuthProvider>
      <UserContextProvider>
        <AppContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/user" />} />
              <Route path="/login" element={<Login />} />

              <Route path="/user" element={<Outlet />}>
                <Route
                  path=""
                  element={
                    <AuthRequired>
                      <UserList />
                    </AuthRequired>
                  }
                />
                <Route path="create" element={<UserCreate />} />
                <Route path=":userId/update" element={<UserUpdate />} />
                <Route
                  path=":userId/password-reset"
                  element={<UserPasswordReset />}
                />
                <Route path=":userId" element={<UserView />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppContainer>
      </UserContextProvider>
    </AuthProvider>
  );
}
export default App;

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.tsx</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
