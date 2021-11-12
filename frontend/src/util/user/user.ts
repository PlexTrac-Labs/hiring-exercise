import axios from "axios";
import { AUTH_TOKEN } from "../../helpful/constants";
import { CreateUserRequest, ResetPasswordRequest, UpdateUserRequest } from "./types"

const config = () => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

// POST
export const createUser = (payload: CreateUserRequest) => {
    return axios.post(`http://localhost:5000/user`, payload)
        .then(res => res.data);
}

export const authenticate = (username: string, password: string) => { //kdp revisit these params
    return axios.post(`http://localhost:5000/authenticate`, { username, password})
        .then(res => res.data);
}

// PUT
export const updateUser = (id: string, payload: UpdateUserRequest) => {
    return axios.put(`http://localhost:5000/user/${id}`, payload, config())
        .then(res => res.data);
}

export const resetPassword = (id: string, payload: ResetPasswordRequest) => {
    return axios.put(`http://localhost:5000/user/resetPassword/${id}`, payload, config())
        .then(res => res.data);
}

//DELETE
export const deleteUser = (id: string) => {
    return axios.delete(`http://localhost:5000/user/${id}`, config())
        .then(res => res.data);
}

// GET

export const getUser = (id: string) => {
    return axios.get(`http://localhost:5000/user/${id}`, config())
        .then(res => res.data)
}

export const getAllUsers = () => {
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGQ4OTRlYjkyNjI0ZWEyYmJhZTkxMSIsInVzZXJuYW1lIjoibmVyZCIsImlhdCI6MTYzNjY3MzQ2OSwiZXhwIjoxNjM2Njc3MDY5fQ.biout-LR9d10roc8afzjKRq8yVVPUGiU0MOFpkhE2Sw';

    return axios.get(`http://localhost:5000/user`, config())
    .then(res => res.data)
}
