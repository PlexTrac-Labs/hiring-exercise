import axios, { AxiosInstance } from "axios";
import React, { useEffect } from "react";
import { User } from "./UserContext";

export interface LoginPayload {
  username: string;
  password: string;
}

interface AuthResp {
  auth_token?: string;
  user?: User;
  error?: string;
}

interface AuthUtils extends AuthResp {
  authenticate: (payload: LoginPayload) => void;
  axiosInstance: AxiosInstance;
}

export const AuthContext = React.createContext<AuthUtils | null>(null);

const axiosInstance = (token?: string) =>
  axios.create({
    baseURL: "http://localhost:5000",
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + token
    }
  });

interface props {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider: React.FC<props> = ({ children }) => {
  const authenticateUser = (payload: LoginPayload) => {
    axiosInstance()
      .post<AuthResp>("/authenticate", payload)
      .then(res => {
        return res.data as AuthResp;
      })
      .then(r => setInitialAuthContext({ ...initialAuthContext, ...r }))
      .catch(r =>
        setInitialAuthContext({
          ...initialAuthContext,
          error: "Username or Password Incorrect"
        })
      );
  };

  const initial: AuthUtils = {
    axiosInstance: axiosInstance(),
    authenticate: authenticateUser
  };

  const [initialAuthContext, setInitialAuthContext] = React.useState<AuthUtils>(
    initial
  );

  useEffect(() => {
    setInitialAuthContext(prevState => ({
      ...prevState,
      axiosInstance: axiosInstance(initialAuthContext.auth_token)
    }));
    console.log(
      "axiosInstance updated with token....",
      initialAuthContext.auth_token
    );
  }, [initialAuthContext.auth_token]);

  return (
    <AuthContext.Provider value={initialAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
