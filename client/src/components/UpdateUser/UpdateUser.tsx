import { Button, TextField } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { Ctx } from "../../App";
import { User } from "../../models/User/User";

interface Props {
  user: User;
}

export const UpdateUser: React.FC<Props> = props => {
  const ctx = React.useContext(Ctx);

  const [firstname, setFirstname] = useState<string>(props.user.firstname);
  const [lastname, setLastname] = useState<string>(props.user.lastname);
  const [username, setUsername] = useState<string>(props.user.username);
  const [email, setEmail] = useState<string>(props.user.email);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(props.user);
  };

  return (
    <form className="modify-user-form" onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        type="text"
        className="firstname-input"
        value={props.user.firstname}
        onChange={e => (props.user.firstname = e.target.value)}
      />
      <Button type="submit" className="login-btn" variant="outlined">
        Login
      </Button>
    </form>
  );
};
