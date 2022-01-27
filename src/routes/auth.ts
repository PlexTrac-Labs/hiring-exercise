import * as Hapi from '@hapi/hapi';
import Joi from 'joi';
import AuthController from '../controllers/AuthController';
import { failAction } from './util';

export default function getRoutes(server: Hapi.Server): void {
  server.route({
    method: 'GET',
    path: '/account',
    options: {},
    handler: AuthController.currentUser
  });

  server.route({
    method: 'POST',
    path: '/account/login',
    options: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().required(),
          password: Joi.string().required()
        },
        failAction
      }
    },
    handler: AuthController.authenticate
  });

  server.route({
    method: 'POST',
    path: '/account/register',
    options: {
      auth: false,
      validate: {
        payload: {
          username: Joi.string().required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().required(),
          birthYear: Joi.string().required(),
          favoriteColor: Joi.string().required(),
          password: Joi.string().required(),
          admin: Joi.boolean()
        },
        failAction
      }
    },
    handler: AuthController.register
  });

  server.route({
    method: 'POST',
    path: '/account/resetpassword',
    options: {
      validate: {
        payload: {
          email: Joi.string().required(),
          currentPassword: Joi.string().required(),
          newPassword: Joi.string().required()
        },
        failAction
      }
    },
    handler: AuthController.resetPassword
  });
}
