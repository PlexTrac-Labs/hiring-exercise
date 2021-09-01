import { User } from "../models/User/User";
import { IAuthService } from "../services/Authentication/Authentication";
import { IUserService } from "../services/User/User";

export interface IContext {
  authService: IAuthService;
  userService: IUserService;
  user?: User;
}
