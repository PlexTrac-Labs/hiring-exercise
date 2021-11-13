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
    return axios.post(`${process.env.REACT_APP_API_HOST}/user`, payload)
        .then(res => res.data);
}

export const authenticate = (username: string, password: string) => {
    return axios.post(`${process.env.REACT_APP_API_HOST}/authenticate`, { username, password})
        .then(res => res.data);
}

// PUT
export const updateUser = (id: string, payload: UpdateUserRequest) => {
    return axios.put(`${process.env.REACT_APP_API_HOST}/user/${id}`, payload, config())
        .then(res => res.data);
}

export const resetPassword = (id: string, payload: ResetPasswordRequest) => {
    return axios.put(`${process.env.REACT_APP_API_HOST}/user/resetPassword/${id}`, payload, config())
        .then(res => res.data);
}

//DELETE
export const deleteUser = (id: string) => {
    return axios.delete(`${process.env.REACT_APP_API_HOST}/user/${id}`, config())
        .then(res => res.data);
}

// GET
export const getUser = (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_HOST}/user/${id}`, config())
        .then(res => res.data)
}

export const getAllUsers = () => {
    return axios.get(`${process.env.REACT_APP_API_HOST}/user`, config())
    .then(res => res.data)
}
