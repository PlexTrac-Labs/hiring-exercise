import { fireEvent, render, waitFor } from "@testing-library/react";
import { It, Mock, Times } from "moq.ts";
import { Ctx } from "../../App";
import { User } from "../../models/User/User";
import {
  IAuthService,
  PasswordResetRequest
} from "../../services/Authentication/Authentication";
import { IUserService } from "../../services/User/User";
import { IContext } from "../../util/Context";
import { PasswordReset } from "./PasswordReset";

describe("Login Component", () => {
  const testUserId = "some id";

  const expectedUser: User = {
    _id: testUserId,
    firstName: "joe",
    lastName: "smith",
    username: "JOE",
    email: "joe.smith@test.com",
    birthYear: 2021,
    favoriteColor: "Orange",
    admin: false,
    password: ""
  };

  test("should reset password", async () => {
    const expectedRequest: PasswordResetRequest = {
      currentPassword: "current password",
      newPassword: "new Password",
      confirmPassword: "new Password"
    };
    const mock = new Mock<IAuthService>()
      .setup(m =>
        m.PasswordReset(
          testUserId,
          It.Is<PasswordResetRequest>(
            v =>
              v.currentPassword === expectedRequest.currentPassword &&
              v.newPassword === expectedRequest.newPassword &&
              v.confirmPassword === expectedRequest.confirmPassword
          )
        )
      )
      .returns(Promise.resolve(expectedUser));

    const context: IContext = {
      userService: {} as IUserService,
      authService: mock.object(),
      user: expectedUser
    };

    const { getByTestId } = render(
      <Ctx.Provider value={context}>
        <PasswordReset></PasswordReset>
      </Ctx.Provider>
    );

    const currentInput = getByTestId("current-password-input");
    fireEvent.change(currentInput, {
      target: { value: expectedRequest.currentPassword }
    });

    const newInput = getByTestId("new-password-input");
    fireEvent.change(newInput, {
      target: { value: expectedRequest.newPassword }
    });

    const confirmInput = getByTestId("confirm-password-input");
    fireEvent.change(confirmInput, {
      target: { value: expectedRequest.confirmPassword }
    });

    fireEvent.click(getByTestId("submit-btn"));

    await waitFor(() => {
      mock.verify(
        m =>
          m.PasswordReset(
            testUserId,
            It.Is<PasswordResetRequest>(
              v =>
                v.currentPassword === expectedRequest.currentPassword &&
                v.newPassword === expectedRequest.newPassword &&
                v.confirmPassword === expectedRequest.confirmPassword
            )
          ),
        Times.Once()
      );
    });
  });
});
