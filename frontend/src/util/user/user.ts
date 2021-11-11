import axios from "axios";
import { CreateUserRequest, ResetPasswordRequest, UpdateUserRequest } from "./types"

// POST
export const createUser = (payload: CreateUserRequest) => {
    console.log('kdp createUser');
    return axios.post(`http://localhost:5000/user`, payload)
        .then(res => res.data);
}

export const authenticate = (username: string, password: string) => { //kdp revisit these params
    return axios.post(`http://localhost:5000/authenticate`, { username, password})
        .then(res => res.data);
}

// PUT
export const updateUser = (id: string, payload: UpdateUserRequest) => {
    console.log('kdp update user')
    return axios.put(`http://localhost:5000/user/${id}`, payload)
        .then(res => res.data);
}

export const resetPassword = (id: string, payload: ResetPasswordRequest) => {
    return axios.put(`http://localhost:5000/user/resetPassword/${id}`, payload)
        .then(res => res.data);
}

//DELETE
export const deleteUser = (id: string) => {
    console.log('kdp deleteUser')
    return axios.delete(`http://localhost:5000/user/${id}`)
        .then(res => res.data);
}

// GET

export const getUser = (id: string) => {
    return axios.get(`http://localhost:5000/user/${id}`)
        .then(res => res.data)
}

export const getAllUsers = () => {
    return axios.get(`http://localhost:5000/user`)
    .then(res => res.data)
}