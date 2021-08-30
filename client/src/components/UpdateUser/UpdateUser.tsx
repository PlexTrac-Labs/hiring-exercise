import { Button, TextField } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Ctx } from "../../App";
import { User } from "../../models/User/User";
import { UpdateUserRequest } from "../../services/User/User";
import { useEffectAsync } from "../../util/UseEffectAsync";
import "./UpdateUser.scss";

interface Props {
  user?: User;
}

interface Params {
  id: string;
}

export const UpdateUser: React.FC<Props> = props => {
  const ctx = React.useContext(Ctx);
  const history = useHistory();
  const { id } = useParams<Params>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffectAsync(async () => {
    await ctx.userService.GetUser(id).then(res => {
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setUsername(res.username);
      setEmail(res.email);
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request: UpdateUserRequest = {
      username,
      email,
      firstName,
      lastName
    };

    await ctx.userService.UpdateUser(id, request).then(async res => {
      if (ctx.user?._id == id) {
        ctx.user = await ctx.userService.GetUser(id);
      }
      history.push("/");
    });
  };

  return (
    <form className="update-user-form" onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        type="text"
        className="firstname-input"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        type="text"
        className="lastname-input"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        label="Username"
        type="text"
        className="username-input"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        type="text"
        className="email-input"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button
        className="cancel-btn"
        variant="contained"
        onClick={() => history.push("/")}
      >
        Cancel
      </Button>
      <Button type="submit" className="submit-btn" variant="contained">
        Submit
      </Button>
    </form>
  );
};
