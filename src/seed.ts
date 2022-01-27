import { User } from 'models/user';
import UserRepository from './repositories/UserRepository';

export async function seedAdminUser() {
  const user: User = {
    email: 'admin@plextrac.com',
    username: 'admin',
    firstName: 'System',
    lastName: 'Admin',
    birthYear: 2000,
    favoriteColor: 'blue',
    password: 'plextrac',
    admin: true
  };

  const userExists = await UserRepository.doesExist(user);

  if (!userExists) {
    const adminUser: User = await UserRepository.create(user);
    if (adminUser) {
      console.log('Seeded admin user');
    }
  }

  return new Promise((resolve, reject) => resolve(userExists));
}
