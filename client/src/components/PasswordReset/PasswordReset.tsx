import { Button, Card, CardContent, TextField } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Ctx } from "../../App";
import { PasswordResetRequest } from "../../services/Authentication/Authentication";
import "./PasswordReset.scss";

export const PasswordReset: React.FC = () => {
  const ctx = React.useContext(Ctx);
  const history = useHistory();
  const id = ctx.user?._id ?? "";

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request: PasswordResetRequest = {
      currentPassword,
      newPassword,
      confirmPassword
    };

    await ctx.authService
      .PasswordReset(id, request)
      .then(async res => {
        if (ctx.user?._id == id) {
          ctx.user = await ctx.userService.GetUser(id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Card className="password-reset-wrapper" variant="outlined">
      <CardContent>
        <form className="password-reset-form" onSubmit={handleSubmit}>
          <TextField
            label="Current Password"
            type="password"
            className="current-passsword-input password-input"
            InputLabelProps={{
              className: "password-input"
            }}
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            className="new-password-input password-input"
            InputLabelProps={{
              className: "password-input"
            }}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            className="confirm-password-input password-input"
            InputLabelProps={{
              className: "password-input"
            }}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
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
