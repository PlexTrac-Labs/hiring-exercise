import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useHistory } from "react-router";
import { Ctx } from "../../App";
import { Login } from "../Login/Login";

interface Props {
  setToken: Dispatch<SetStateAction<string>>;
}

export const Signout: React.FC<Props> = props => {
  const ctx = React.useContext(Ctx);
  const history = useHistory();

  useEffect(() => {
    ctx.user = undefined;
    ctx.setAccessToken("");
    props.setToken("");
    history.push("/");
  }, []);

  return <div></div>;
};
