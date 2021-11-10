import axios from "axios";
import React from "react";
import { User } from "./UserContext";

export const axiosInstance = (token?: string) =>
  axios.create({
    baseURL: "http://localhost:5000",
    timeout: 5000,
    headers: {
      Authorization: token ? "Bearer " + token : ""
    }
  });

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignUpPayload {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface AuthState {
  auth_token?: string;
  user?: User;
  AuthError?: string;
  SignUpError?: string;
}

interface IAuthContext {
  state: AuthState;
  dispatch?: React.Dispatch<IAction>;
}

interface IAction {
  type: string;
  payload: any;
}

// SELECTORS
export const selectIsAuthenticated = (state: AuthState): boolean =>
  state.auth_token ? true : false;
export const selectAuthToken = (state: AuthState): string | undefined =>
  state.auth_token;
export const selectAuthenticatedUser = (state: AuthState): User | undefined =>
  state.user;
export const selectAuthError = (state: AuthState): string | undefined =>
  state.AuthError;
export const selectSignUpError = (state: AuthState): string | undefined =>
  state.SignUpError;

// ACTIONS
const authSuccess = "authSuccess";
export const actionAuthSuccess = (payload: AuthState): IAction => ({
  type: authSuccess,
  payload
});
const authFail = "authFail";
export const actionAuthFail = (AuthError: string): IAction => ({
  type: authFail,
  payload: AuthError
});
// signUpSuccess = 'signUpSuccess'
// export const ac

// REDUCER
function reducer(state: AuthState, action: IAction): AuthState {
  switch (action.type) {
    case authSuccess:
      return {
        ...state,
        auth_token: action.payload.auth_token,
        user: action.payload.user
      };
    case authFail:
      return { ...state, AuthError: action.payload };
    default:
      return state;
  }
}

// CONTEXT PROVIDED
export const AuthContext = React.createContext<IAuthContext | null>(null);

interface props {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider: React.FC<props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
