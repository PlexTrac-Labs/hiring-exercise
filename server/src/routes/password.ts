import * as Hapi from "@hapi/hapi";
import Joi from "joi";
import PasswordController from "../controllers/PasswordController";
import { failAction } from "./util";

export default function getRoutes(server: Hapi.Server): void {
  server.route({
    method: "PUT",
    path: "/passwordreset/{userId}",
    options: {
      auth: "jwt",
      validate: {
        params: {
          userId: Joi.string().required()
        },
        payload: {
          currentPassword: Joi.string().required(),
          newPassword: Joi.string().required(),
          confirmPassword: Joi.string().required()
        },
        failAction
      }
    },
    handler: PasswordController.Reset
  });
}
