export class UserFormValues {
  email: string = '';
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  birthYear: string = '';
  favoriteColor: string = '';
  password?: string = '';
  admin: boolean = false;

  constructor(user?: UserFormValues) {
    if (user) {
      this.email = user.email;
      this.username = user.username;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.birthYear = user.birthYear;
      this.favoriteColor = user.favoriteColor;
      this.password = user.password;
      this.admin = user.admin;

      if (!user.password) {
        this.password = '';
      }
    }
  }
}
