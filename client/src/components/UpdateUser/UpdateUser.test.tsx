import { fireEvent, render, waitFor } from "@testing-library/react";
import { It, Mock, Times } from "moq.ts";
import { Ctx, IContext } from "../../App";
import { User } from "../../models/User/User";
import { IAuthService } from "../../services/Authentication/Authentication";
import { IUserService, UpdateUserRequest } from "../../services/User/User";
import { UpdateUser } from "./UpdateUser";
import Router from "react-router";

describe("Update User Component", () => {
  const expectedUser: User = {
    _id: "some id",
    firstName: "joe",
    lastName: "smith",
    username: "JOE",
    email: "joe.smith@test.com",
    birthYear: 2021,
    favoriteColor: "Orange",
    admin: false,
    password: ""
  };

  const matchRequests = (
    actual: UpdateUserRequest,
    expected: UpdateUserRequest
  ) => {
    var match =
      actual.username === expected.username &&
      actual.email === expected.email &&
      actual.firstName === expected.firstName &&
      actual.lastName === expected.lastName &&
      actual.birthYear === expected.birthYear &&
      actual.favoriteColor === expected.favoriteColor;
    return match;
  };

  test("should update the user", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({
      id: expectedUser._id
    });
    const expectedRequest: UpdateUserRequest = {
      username: "EOJ",
      email: "smith.joe@test.com",
      firstName: "eoj",
      lastName: "htims",
      birthYear: 1202,
      favoriteColor: "Egnaro"
    };

    const mock = new Mock<IUserService>()
      .setup(m => m.GetUser(expectedUser._id))
      .returns(Promise.resolve(expectedUser))
      .setup(m =>
        m.UpdateUser(
          expectedUser._id,
          It.Is<UpdateUserRequest>(v => matchRequests(v, expectedRequest))
        )
      )
      .returns(Promise.resolve());

    const context: IContext = {
      userService: mock.object(),
      authService: {} as IAuthService,
      getAccessToken: () => "",
      setAccessToken: token => {},
      user: expectedUser
    };

    const { getByTestId } = render(
      <Ctx.Provider value={context}>
        <UpdateUser></UpdateUser>
      </Ctx.Provider>
    );

    const firstNameInput = getByTestId("first-name-input");
    fireEvent.change(firstNameInput, {
      target: { value: expectedRequest.firstName }
    });

    const lastNameInput = getByTestId("last-name-input");
    fireEvent.change(lastNameInput, {
      target: { value: expectedRequest.lastName }
    });

    const usernameInput = getByTestId("username-input");
    fireEvent.change(usernameInput, {
      target: { value: expectedRequest.username }
    });

    const emailInput = getByTestId("email-input");
    fireEvent.change(emailInput, {
      target: { value: expectedRequest.email }
    });

    const birthYearInput = getByTestId("birth-year-input");
    fireEvent.change(birthYearInput, {
      target: { value: expectedRequest.birthYear }
    });

    const favoriteColorInput = getByTestId("favorite-color-input");
    fireEvent.change(favoriteColorInput, {
      target: { value: expectedRequest.favoriteColor }
    });

    fireEvent.click(getByTestId("submit-btn"));

    await waitFor(() => {
      mock.verify(
        m =>
          m.UpdateUser(
            expectedUser._id,
            It.Is<UpdateUserRequest>(v => matchRequests(v, expectedRequest))
          ),
        Times.Once()
      );
    });
  });
});
