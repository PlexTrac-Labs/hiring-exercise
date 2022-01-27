import * as Hapi from '@hapi/hapi';
import bcrypt from 'bcryptjs';
import { User } from 'models/user';
import UserModel from '../models/users/user';
import { Credentials, token } from 'auth/auth';
import TokenImpl from '../auth/token';
import { Session } from 'responses/responses';
import UserRepository from '../repositories/UserRepository';

class AuthController {
  private validateUser = async (
    email: string,
    password: string
  ): Promise<User | never> => {
    return new Promise((resolve, reject) => {
      UserModel.findOne(
        {
          $or: [{ email: email }]
        },
        (err, $user) => {
          if (err || !$user) {
            reject(err ? err : 'Invalid Credentials');
          } else {
            bcrypt.compare(password, $user.password, (err, isValid) => {
              if (isValid) {
                delete $user.password;
                resolve($user);
              } else {
                reject('Invalid Credentials');
              }
            });
          }
        }
      );
    });
  };

  public authenticate = async (request, h): Promise<Hapi.ResponseObject> => {
    const { email, password } = request.payload;
    try {
      const user: User = await this.validateUser(email, password);

      const token: token = TokenImpl.create(user);

      const response: Session = {
        token,
        user
      };

      return h.response(response);
    } catch (error) {
      return h
        .response({ status: 'error', error: error.message })
        .code(401)
        .takeover();
    }
  };

  public register = async (request, h): Promise<Hapi.ResponseObject> => {
    const payload: User = request.payload;

    try {
      const exists: boolean = await UserRepository.doesExist(payload);
      if (exists) {
        throw new Error('A user already exists with that email.');
      }
      const user: User = await UserRepository.create(payload);
      const token: token = TokenImpl.create(user);

      const response: Session = {
        token,
        user
      };

      return h.response(response);
    } catch (error) {
      return h
        .response({ status: 'error', error: error.message })
        .code(400)
        .takeover();
    }
  };

  public resetPassword = async (request, h): Promise<Hapi.ResponseObject> => {
    const { email, currentPassword, newPassword } = request.payload;
    try {
      const user: User = await this.validateUser(email, currentPassword);

      const updated: User = await UserRepository.resetPassword(
        user._id!,
        newPassword
      );

      return h.response(updated);
    } catch (error) {
      return h
        .response({ status: 'error', error: error.message })
        .code(403)
        .takeover();
    }
  };

  public currentUser = async (request, h): Promise<Hapi.ResponseObject> => {
    try {
      const credentials: Credentials = request.auth.credentials;

      const user: User = await UserRepository.getById(credentials.userId);

      return h.response(user);
    } catch (error) {
      return h
        .response({ status: 'error', error: error.message })
        .code(403)
        .takeover();
    }
  };
}

export default new AuthController();
