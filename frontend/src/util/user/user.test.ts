import axios from "axios";
import { CreateUserRequest, ResetPasswordRequest, UpdateUserRequest, User } from "./types";
import { authenticate, createUser, deleteUser, getAllUsers, getUser, resetPassword, updateUser } from "./user";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const EMPTY_USER: User = {
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    birthYear: 2000,
    favColor: "",
    admin: false,
  }

test('getAllUsers success', async () => {
    const testData = [
        EMPTY_USER,
        EMPTY_USER,
        EMPTY_USER,
    ];
    mockedAxios.get.mockResolvedValue({
        data: testData
    })
    return getAllUsers().then(data => expect(data).toEqual(testData))
})

test('getUser success', async () => {
    mockedAxios.get.mockResolvedValue({
        data: EMPTY_USER
    });
    return getUser('id').then(data => expect(data).toEqual(EMPTY_USER))
})

test('deleteUser success', async () => {
    mockedAxios.delete.mockResolvedValue({
        data: EMPTY_USER
    });
    return deleteUser('id').then(data => expect(data).toEqual(EMPTY_USER))
})

test('resetPassword success', async () => {
    const testReset: ResetPasswordRequest = {
        oldPassword: 'old',
        newPassword: 'new',
    }
    const resp = {
        n: 1,
        nModified: 1,
        ok: 1,
    }
    mockedAxios.put.mockResolvedValue({data: resp});
    return resetPassword('id', testReset).then(data => expect(data).toEqual(resp))
})

test('updateUser success', async () => {
    const request: UpdateUserRequest = {
        username: 'test'
    };
    const resp = {
        n: 1,
        nModified: 1,
        ok: 1,
    }
    mockedAxios.put.mockResolvedValue({data: resp});
    return updateUser('id', request).then(data => expect(data).toEqual(resp));
})

test('authenticate success', async () => {
    const resp = {
        auth_token: "token",
        user: EMPTY_USER
    };
    mockedAxios.post.mockResolvedValue({data: resp});
    return authenticate('username', 'password').then(data => expect(data).toEqual(resp))
})

test('createUser success', async () => {
    const payload: CreateUserRequest = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        birthYear: 2000,
        favColor: '',
    }
    mockedAxios.post.mockResolvedValue({data: EMPTY_USER});
    return createUser(payload).then(data => expect(data).toEqual(EMPTY_USER))
})
