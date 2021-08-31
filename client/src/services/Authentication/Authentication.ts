import { Login } from "../../models/Login/Login";
import axios from "axios";
import { User } from "../../models/User/User";

export interface AuthResponse {
  auth_token: string;
  user: User;
}

export interface PasswordResetRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IAuthService {
  Login(login: Login): Promise<AuthResponse>;
  PasswordReset(userId: string, request: PasswordResetRequest): Promise<User>;
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

  public async PasswordReset(
    userId: string,
    request: PasswordResetRequest
  ): Promise<User> {
    return await axios
      .put(this.baseUrl + `/passwordreset/${userId}`, request)
      .then(res => {
        return res.data;
      });
  }
}
