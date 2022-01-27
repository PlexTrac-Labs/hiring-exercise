import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '../models/user';
import { UserFormValues } from '../models/userFormValues';
import agent from '../api/agent';

export default class UserStore {
  UserRegistry = new Map<string, User>();
  selectedUser: User | undefined = undefined;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  get UserList() {
    return Array.from(this.UserRegistry.values());
  }

  get SelectedUser() {
    return this.selectedUser;
  }

  getUsers = async () => {
    this.loading = true;
    try {
      const result = await agent.Users.list();
      runInAction(() => {
        this.UserRegistry.clear();
        result.forEach(User => {
          this.setUser(User);
        });
        this.loading = false;
        this.setLoadingInitial(false);
      });
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  };

  getUser = async (userId: string) => {
    this.loading = true;
    try {
      const user = await agent.Users.get(userId);
      runInAction(() => {
        this.setSelectedUser(user);
        this.loading = false;
      });
      return user;
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  };

  addUser = async (formData: UserFormValues) => {
    this.loading = true;
    try {
      const user = await agent.Users.add(formData);
      runInAction(() => {
        this.getUsers();
        this.loading = false;
      });
      return user;
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  };

  updateUser = async (userId: string, formData: UserFormValues) => {
    this.loading = true;
    try {
      const user = await agent.Users.update(userId, formData);
      runInAction(() => {
        this.getUsers();
        this.loading = false;
      });
      return user;
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  };

  deleteUser = async (userId: string) => {
    this.loading = true;
    try {
      const user = await agent.Users.delete(userId);
      runInAction(() => {
        this.clearSelectedUser();
        this.loading = false;
      });
      return user;
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  };

  clearSelectedUser = () => {
    this.selectedUser = undefined;
  };

  private setSelectedUser = (User: User | undefined) => {
    this.selectedUser = User;
  };

  private setUser = (User: User) => {
    this.UserRegistry.set(User.email, User);
  };
}
