import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useHistory } from "react-router";
import { Ctx } from "../../App";
import { setAccessToken } from "../../util/Token";

interface Props {
  setToken: Dispatch<SetStateAction<string>>;
}

export const Signout: React.FC<Props> = props => {
  const ctx = React.useContext(Ctx);
  const history = useHistory();

  useEffect(() => {
    ctx.user = undefined;
    setAccessToken("");
    props.setToken("");
    history.push("/");
  }, []);

  return <div></div>;
};
