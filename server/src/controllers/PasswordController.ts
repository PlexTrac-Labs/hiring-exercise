import * as Hapi from "@hapi/hapi";
import { User } from "models/user";
import bcrypt from "bcryptjs";
import UserRepository from "../repositories/UserRepository";

class PasswordController {
  private validateUser = async (
    userId: string,
    password: string
  ): Promise<User | never> => {
    const user: User = await UserRepository.getById(userId);
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (_, isValid) => {
        if (isValid) {
          delete user.password;
          resolve(user);
        } else {
          reject("Invalid Credentials");
        }
      });
    });
  };

  public Reset = async (request, h): Promise<Hapi.ServerResponse> => {
    const { currentPassword, newPassword, confirmPassword } = request.payload;
    const userId: string = request.params.userId;
    try {
      await this.validateUser(userId, currentPassword);

      if (newPassword !== confirmPassword) throw new Error("Password mismatch");

      const updated: User = await UserRepository.updatePassword(
        userId,
        newPassword
      );

      return h.response(updated);
    } catch (error) {
      return h
        .response({ status: "error", error: error.message })
        .code(400)
        .takeover();
    }
  };
}

export default new PasswordController();
