import { Button, Card, CardContent, TextField } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Ctx } from "../../App";
import { UpdateUserRequest } from "../../services/User/User";
import { useEffectAsync } from "../../util/UseEffectAsync";
import "./UpdateUser.scss";

interface Params {
  id: string;
}

export const UpdateUser: React.FC = () => {
  const ctx = React.useContext(Ctx);
  const history = useHistory();
  const { id } = useParams<Params>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthYear, setBirthYear] = useState<number>();
  const [favoriteColor, setFavoriteColor] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffectAsync(async () => {
    await ctx.userService.GetUser(id).then(res => {
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setUsername(res.username);
      setEmail(res.email);
      setBirthYear(res.birthYear);
      setFavoriteColor(res.favoriteColor);
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request: UpdateUserRequest = {
      username,
      email,
      firstName,
      lastName,
      birthYear,
      favoriteColor
    };

    await ctx.userService
      .UpdateUser(id, request)
      .then(async res => {
        if (ctx.user?._id === id) {
          ctx.user = await ctx.userService.GetUser(id);
        }
        history.goBack();
      })
      .catch(() => {
        setError("Failed to update user. Please try again.");
      });
  };

  return (
    <Card className="update-user-wrapper" variant="outlined">
      <CardContent>
        <form className="update-user-form" onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            type="text"
            className="firstname-input update-input"
            InputLabelProps={{
              className: "update-input"
            }}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            type="text"
            className="lastname-input update-input"
            InputLabelProps={{
              className: "update-input"
            }}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            label="Username"
            type="text"
            className="username-input update-input"
            InputLabelProps={{
              className: "update-input"
            }}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="text"
            className="email-input update-input"
            InputLabelProps={{
              className: "update-input"
            }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Birth Year"
            type="number"
            className="birth-year-input update-input"
            InputLabelProps={{
              className: "update-input"
            }}
            value={birthYear}
            onChange={e => setBirthYear(+e.target.value)}
          />
          <TextField
            label="Favorite Color"
            type="text"
            className="favorite-color-input update-input"
            InputLabelProps={{
              className: "update-input"
            }}
            value={favoriteColor}
            onChange={e => setFavoriteColor(e.target.value)}
          />
          <div className="error-container">
            {error && <p className="error-message">* {error}</p>}
          </div>
          <div className="form-btns">
            <Button
              className="cancel-btn form-btn"
              variant="contained"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="submit-btn form-btn"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
