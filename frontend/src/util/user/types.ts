
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
