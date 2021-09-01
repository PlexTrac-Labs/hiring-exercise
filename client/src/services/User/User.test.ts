import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { UpdateUserRequest, UserService } from "./User";

describe("UserService", () => {
  const baseUrl = "http://fake.url.test";

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

  test("Should return users list", async () => {
    const mock = new MockAdapter(axios);

    mock.onGet(baseUrl + "/user").replyOnce(200, users);

    const service = new UserService(baseUrl);

    const result = await service.GetUsers();

    expect(result).toStrictEqual(users);
  });

  test("Should delete user", async () => {
    const user = users[0];
    const mock = new MockAdapter(axios);

    mock.onDelete(baseUrl + `/user/${user._id}`).replyOnce(200, user);

    const service = new UserService(baseUrl);

    const result = await service.DeleteUser(user._id);

    expect(result).toStrictEqual(user);
  });

  test("Should return user by id", async () => {
    const user = users[0];
    const mock = new MockAdapter(axios);

    mock.onGet(baseUrl + `/user/${user._id}`).replyOnce(200, user);

    const service = new UserService(baseUrl);

    const result = await service.GetUser(user._id);

    expect(result).toStrictEqual(user);
  });

  test("Should update user", async () => {
    const user = users[0];
    const request: UpdateUserRequest = {
      username: "updated",
      email: "new email",
      firstName: "different",
      lastName: "changed",
      birthYear: 2000,
      favoriteColor: "Black"
    };
    const mock = new MockAdapter(axios);

    mock.onPut(baseUrl + `/user/${user._id}`, request).replyOnce(200, user);

    const service = new UserService(baseUrl);

    await service.UpdateUser(user._id, request);

    expect(mock.history.put.length).toBe(1);
  });
});
