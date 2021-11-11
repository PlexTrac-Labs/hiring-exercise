
export type CreateUserRequest = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    birthYear: number;
    favColor: string;
}

export type UpdateUserRequest = {
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    birthYear?: number;
    favColor?: string;
};

export type User = {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    birthYear: number;
    favColor: string;
    admin: boolean;
}

export type AuthResponse = {
    auth_token: string;
    user: User;
}

export type ResetPasswordRequest = {
    oldPassword: string;
    newPassword: string;
}
