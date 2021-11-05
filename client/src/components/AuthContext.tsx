import axios from "axios";
import React, { useEffect } from "react";

interface LoginPayload {
  username: string;
  password: string;
}

interface UserObj {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
}

interface AuthUtils {
  login: (payload: LoginPayload) => void;
  authenticatedApiConfig: (paylaod: {}) => any; // returns an axios object read to use
  jwtToken?: string;
  user?: UserObj;
}

export const AuthContext = React.createContext<AuthUtils | null>(null);

const AuthProvider = (props: any) => {
  const [
    initialAuthContext,
    setInitialAuthContext
  ] = React.useState<AuthUtils | null>(null);

  const logUserIn = (payload: LoginPayload) => {
    axios
      .post(`${window.location.hostname}:5000/`)
      .then(res => {
        console.log("SUCCESS...", res.data);
      })
      .catch(err => {
        console.log("ERROR...", err);
      });
  };

  useEffect(() => {
    const initial: AuthUtils = {
      jwtToken: undefined,
      user: undefined,
      login: logUserIn,
      authenticatedApiConfig: () => {}
    };
    setInitialAuthContext(initial);
  }, []);

  return (
    <AuthContext.Provider value={initialAuthContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
