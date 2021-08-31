import { waitFor } from "@testing-library/dom";
import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { Login } from "../../models/Login/Login";
import { User } from "../../models/User/User";
import { AuthService, PasswordResetRequest } from "./Authentication";

describe("AuthService", () => {
  const baseUrl = "http://fake.url.test";

  const user: User = {
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

  test("should make successful login requests", async () => {
    const fakeLogin: Login = {
      username: "some name",
      password: "my password"
    };

    const mock = new MockAdapter(axios);
    mock.onPost(baseUrl + "/authenticate", fakeLogin).replyOnce(200, user);

    const service = new AuthService(baseUrl);

    const result = await service.Login(fakeLogin);

    expect(result).toStrictEqual(user);
  });

  test("should make successful password reset", async () => {
    const fakeUserId = "some user id";
    const request: PasswordResetRequest = {
      currentPassword: "the current password",
      newPassword: "the new one",
      confirmPassword: "the new one"
    };

    const mock = new MockAdapter(axios);
    mock
      .onPut(baseUrl + `/passwordreset/${fakeUserId}`, request)
      .replyOnce(200, user);

    const service = new AuthService(baseUrl);

    const result = await service.PasswordReset(fakeUserId, request);

    expect(result).toStrictEqual(user);
  });
});
