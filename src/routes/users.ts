import * as Hapi from '@hapi/hapi';
import Joi from 'joi';
import UserController from '../controllers/UserController';
import { failAction } from './util';

export default function getRoutes(server: Hapi.Server): void {
  server.route({
    method: 'GET',
    path: '/user/{userId}',
    options: {
      validate: {
        params: {
          userId: Joi.string().required()
        },
        failAction
      }
    },
    handler: UserController.get
  });

  server.route({
    method: 'GET',
    path: '/user',
    handler: UserController.list
  });

  server.route({
    method: 'DELETE',
    path: '/user/{userId}',
    options: {
      validate: {
        params: {
          userId: Joi.string().required()
        },
        failAction
      }
    },
    handler: UserController.delete
  });

  server.route({
    method: 'PUT',
    path: '/user/{userId}',
    options: {
      validate: {
        params: {
          userId: Joi.string().required()
        },
        payload: {
          username: Joi.string(),
          firstName: Joi.string(),
          lastName: Joi.string(),
          email: Joi.string(),
          birthYear: Joi.string(),
          favoriteColor: Joi.string(),
          password: Joi.string(),
          admin: Joi.boolean()
        },
        failAction
      }
    },
    handler: UserController.update
  });

  server.route({
    method: 'POST',
    path: '/user',
    options: {
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
    handler: UserController.create
  });
}
