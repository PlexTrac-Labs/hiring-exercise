import { render, waitFor } from "@testing-library/react";
import { Mock } from "moq.ts";
import Router from "react-router";
import { Ctx } from "../../App";
import { User } from "../../models/User/User";
import { IAuthService } from "../../services/Authentication/Authentication";
import { IUserService } from "../../services/User/User";
import { IContext } from "../../util/Context";
import { UserDetails } from "./UserDetails";

describe("User Details", () => {
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

  test("Should populate user", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({
      id: expectedUser._id
    });
    const mock = new Mock<IUserService>()
      .setup(m => m.GetUser(expectedUser._id))
      .returns(Promise.resolve(expectedUser));

    const context: IContext = {
      userService: mock.object(),
      authService: {} as IAuthService,
      user: expectedUser
    };

    const { getByText } = render(
      <Ctx.Provider value={context}>
        <UserDetails />
      </Ctx.Provider>
    );

    await waitFor(() => {
      expect(getByText(expectedUser.username)).toBeInTheDocument();
      expect(getByText(expectedUser.firstName)).toBeInTheDocument();
      expect(getByText(expectedUser.lastName)).toBeInTheDocument();
      expect(getByText(expectedUser.email)).toBeInTheDocument();
      expect(getByText(expectedUser.favoriteColor)).toBeInTheDocument();
      expect(getByText(expectedUser.birthYear)).toBeInTheDocument();
    });
  });
});
