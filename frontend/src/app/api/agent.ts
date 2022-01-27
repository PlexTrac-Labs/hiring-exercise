import axios, { AxiosResponse } from 'axios';
import { LoginFormValues } from '../models/loginFormValues';
import { RegisterFormValues } from '../models/registerFormValues';
import { ResetPasswordFormValues } from '../models/resetPasswordFormValues';
import { UserFormValues } from '../models/userFormValues';
import { Session } from '../models/session';
import { User } from '../models/user';
import { store } from '../stores/store';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
  const token = store.sessionStore.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Accounts = {
  current: () => requests.get<User>('/account'),
  login: (formData: LoginFormValues) =>
    requests.post<Session>('/account/login', formData),
  register: (formData: RegisterFormValues) =>
    requests.post<Session>('/account/register', formData),
  resetPassword: (formData: ResetPasswordFormValues) =>
    requests.post<User>('/account/resetpassword', formData)
};

const Users = {
  add: (formData: UserFormValues) => requests.post<User>('/user', formData),
  get: (userId: string) => requests.get<User>(`/user/${userId}`),
  list: () => requests.get<User[]>(`/user`),
  delete: (userId: string) => requests.delete<User>(`/user/${userId}`),
  update: (userId: string, formData: UserFormValues) =>
    requests.put<User>(`/user/${userId}`, formData)
};

const agent = {
  Accounts,
  Users
};

export default agent;
