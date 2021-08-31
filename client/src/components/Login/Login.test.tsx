import { fireEvent, render } from "@testing-library/react";
import { LoginComponent } from "./Login";
import { Mock, It, Times } from "moq.ts";
import {
  IAuthService,
  AuthResponse
} from "../../services/Authentication/Authentication";
import { Ctx, IContext } from "../../App";
import { IUserService } from "../../services/User/User";
import { Login } from "../../models/Login/Login";

describe("Login Component", () => {
  const testUsername = "test username";
  const testPassword = "test password";
  const testResponse: AuthResponse = {
    auth_token: "some token",
    user: {
      _id: "some id",
      firstName: "joe",
      lastName: "smith",
      username: testUsername,
      email: "joe.smith@test.com",
      birthYear: 2021,
      favoriteColor: "Orange",
      admin: false,
      password: ""
    }
  };

  test("Should log user in", () => {
    const mock = new Mock<IAuthService>()
      .setup(m =>
        m.Login(
          It.Is<Login>(
            v => v.username === testUsername && v.password === testPassword
          )
        )
      )
      .returns(Promise.resolve(testResponse));

    const context: IContext = {
      userService: {} as IUserService,
      authService: mock.object(),
      getAccessToken: () => "",
      setAccessToken: token => {}
    };

    const setToken = () => {};

    const { getByTestId } = render(
      <Ctx.Provider value={context}>
        <LoginComponent setToken={setToken}></LoginComponent>
      </Ctx.Provider>
    );

    const usernameInput = getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: testUsername } });

    const passwordInput = getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    fireEvent.click(getByTestId("submit-btn"));

    mock.verify(
      m =>
        m.Login(
          It.Is<Login>(
            v => v.username === testUsername && v.password === testPassword
          )
        ),
      Times.Once()
    );
  });
});
