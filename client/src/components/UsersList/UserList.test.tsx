import { render, waitFor } from "@testing-library/react";
import { Mock } from "moq.ts";
import { Ctx } from "../../App";
import { IAuthService } from "../../services/Authentication/Authentication";
import { IUserService } from "../../services/User/User";
import { IContext } from "../../util/Context";
import { UsersList } from "./UserList";

describe("User List", () => {
  const users = [
    {
      _id: "user 1",
      firstName: "test",
      lastName: "user",
      username: "one",
      email: "user.one@test.com",
      birthYear: 2021,
      favoriteColor: "Orange",
      admin: false,
      password: ""
    },
    {
      _id: "user 2",
      firstName: "test",
      lastName: "user",
      username: "two",
      email: "user.two@test.com",
      birthYear: 2021,
      favoriteColor: "Red",
      admin: false,
      password: ""
    },
    {
      _id: "user 3",
      firstName: "test",
      lastName: "user",
      username: "three",
      email: "user.three@test.com",
      birthYear: 2021,
      favoriteColor: "Blue",
      admin: false,
      password: ""
    }
  ];

  test("should populate users", async () => {
    const mock = new Mock<IUserService>()
      .setup(m => m.GetUsers())
      .returns(Promise.resolve(users));

    const context: IContext = {
      userService: mock.object(),
      authService: {} as IAuthService
    };

    const { getByText } = render(
      <Ctx.Provider value={context}>
        <UsersList />
      </Ctx.Provider>
    );

    await waitFor(() => {
      // there appears to be a bug with rendering DataGrids from testing https://github.com/mui-org/material-ui-x/issues/1151
    });
  });
});
