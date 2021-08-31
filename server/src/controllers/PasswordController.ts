import * as Hapi from "@hapi/hapi";
import { User } from "models/user";
import bcrypt from "bcryptjs";
import UserRepository from "../repositories/UserRepository";

class PasswordController {
  public async Reset(request, h): Promise<Hapi.ServerResponse> {
    const { currentPassword, newPassword, confirmPassword } = request.payload;
    const userId: string = request.params.userId;
    try {
      const user: User = await UserRepository.getById(userId);
      let passwordsValid: boolean = false;

      bcrypt.compare(currentPassword, user.password, (err, isValid) => {
        passwordsValid = isValid;
      });

      if (passwordsValid) {
        delete user.password;
      } else {
        throw new Error("Invalid Credentials");
      }

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
  }
}

export default new PasswordController();
