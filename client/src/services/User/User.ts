import axios from "axios";
import { User } from "../../models/User/User";

export interface IUserService {
  GetUsers(): Promise<User[]>;
}

export class UserService implements IUserService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async GetUsers(): Promise<User[]> {
    return await axios.get<User[]>(this.baseUrl + "/user").then(res => {
      console.log("users: ", res.data);
      return res.data;
    });
  }
}
