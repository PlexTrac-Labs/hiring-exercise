import axios from "axios";
import { User } from "../../models/User/User";

export interface IUserService {
  GetUsers(): Promise<User[]>;
  DeleteUser(id: string): Promise<User>;
  GetUser(id: string): Promise<User>;
  UpdateUser(id: string, request: UpdateUserRequest): Promise<void>;
}

export interface UpdateUserRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthYear: number | undefined;
  favoriteColor: string;
}

export class UserService implements IUserService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async GetUsers(): Promise<User[]> {
    return await axios.get<User[]>(this.baseUrl + "/user").then(res => {
      return res.data;
    });
  }

  public async DeleteUser(id: string): Promise<User> {
    return await axios.delete<User>(this.baseUrl + `/user/${id}`).then(res => {
      return res.data;
    });
  }

  public async GetUser(id: string): Promise<User> {
    return await axios.get<User>(this.baseUrl + `/user/${id}`).then(res => {
      return res.data;
    });
  }

  public async UpdateUser(
    id: string,
    request: UpdateUserRequest
  ): Promise<void> {
    await axios.put<User>(this.baseUrl + `/user/${id}`, request);
  }
}
