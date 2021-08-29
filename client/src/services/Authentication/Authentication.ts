import { Login } from "../../models/Login/Login";
import axios from "axios";
import { User } from "../../models/User/User";

export interface AuthResponse {
  auth_token: string;
  user: User;
}

export interface IAuthService {
  Login(login: Login): Promise<AuthResponse>;
}

export class AuthService implements IAuthService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async Login(login: Login): Promise<AuthResponse> {
    return await axios.post(this.baseUrl + "/authenticate", login).then(res => {
      return res.data;
    });
  }
}
