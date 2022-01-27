import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { User } from '../models/user';
import { Session } from '../models/session';
import { LoginFormValues } from '../models/loginFormValues';
import { RegisterFormValues } from '../models/registerFormValues';
import { ResetPasswordFormValues } from '../models/resetPasswordFormValues';
import agent from '../api/agent';

export default class SessionStore {
  currentUser: User | null = null;
  token: string | null = window.localStorage.getItem(
    process.env.REACT_APP_JWT_KEY_ID!
  );
  loading = false;
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem(process.env.REACT_APP_JWT_KEY_ID!, token);
        } else {
          window.localStorage.removeItem(process.env.REACT_APP_JWT_KEY_ID!);
        }
      }
    );
  }

  get isLoggedIn() {
    return (
      !!this.token &&
      !!window.localStorage.getItem(process.env.REACT_APP_JWT_KEY_ID!)
    );
  }

  get isAdmin() {
    return !!this.currentUser?.admin;
  }

  login = async (formData: LoginFormValues) => {
    this.loading = true;
    try {
      const session = await agent.Accounts.login(formData);
      runInAction(() => {
        if (session) {
          this.setSessionData(session);
        }
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  };

  logout() {
    this.setCurrentUser(null);
    this.setToken(null);
  }

  register = async (formData: RegisterFormValues) => {
    this.loading = true;
    try {
      const session = await agent.Accounts.register(formData);
      runInAction(() => {
        if (session) {
          this.setSessionData(session);
        }
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  };

  resetPassword = async (formData: ResetPasswordFormValues) => {
    this.loading = true;
    try {
      const user = await agent.Accounts.resetPassword(formData);
      runInAction(() => {
        if (user) {
        }
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  };

  getCurrentUser = async () => {
    try {
      const user = await agent.Accounts.current();
      runInAction(() => {
        if (user) {
          this.setCurrentUser(user);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  private setSessionData = (Session: Session) => {
    this.setCurrentUser(Session.user);
    this.setToken(Session.token);
  };

  private setCurrentUser = (User: User | null) => {
    this.currentUser = User;
  };

  private setToken = (Token: string | null) => {
    this.token = Token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
