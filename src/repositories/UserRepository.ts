import { User } from 'models/user';
import bcrypt from 'bcryptjs';
import UserModel from '../models/users/user';

class UserRepository {
  private async hashPassword(password): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
    });
  }

  public async update(update: User, userId: string): Promise<User> {
    if (update.password && update.password !== '') {
      const hashedPassword: string = await this.hashPassword(update.password);
      update.password = hashedPassword;
    }

    return new Promise((resolve, reject) => {
      UserModel.updateOne(
        { _id: userId },
        update,
        undefined,
        (error, writeResult: User) => {
          if (error) {
            reject(error);
          } else {
            resolve(writeResult);
          }
        }
      );
    });
  }

  public async doesExist(user: User): Promise<boolean> {
    return new Promise(resolve => {
      UserModel.find({ email: user.email }, (error: Error, users: User[]) => {
        if (error || !users.length) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  public async create(user: User): Promise<User> {
    const password: string = await this.hashPassword(user.password);
    const $user = new UserModel({
      ...user,
      password
    });
    delete $user.password;
    return $user.save();
  }

  public async getById(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      UserModel.find({ _id: userId }, (error: Error, users: User[]) => {
        if (error) {
          reject(error);
        } else if (!users.length) {
          reject(`No user found with id: ${userId}`);
        } else {
          const user = users[0];
          resolve(user);
        }
      }).select('-password');
    });
  }

  public async list(): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      UserModel.find({}, (error: Error, users: User[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(users);
        }
      })
        .select('-password')
        .sort({ lastName: 1 });
    });
  }

  public async deleteById(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      UserModel.deleteOne({ _id: userId }, error => {
        if (error) {
          reject(error);
        } else {
          resolve(userId);
        }
      });
    });
  }

  public async resetPassword(userId: string, password: string): Promise<User> {
    const hashedPassword: string = await this.hashPassword(password);
    return new Promise((resolve, reject) => {
      UserModel.updateOne(
        { _id: userId },
        { password: hashedPassword },
        undefined,
        (error, writeResult: User) => {
          if (error) {
            reject(error);
          } else {
            resolve(writeResult);
          }
        }
      );
    });
  }
}

export default new UserRepository();
