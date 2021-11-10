import axios from "axios";
import { CreateUserRequest, UpdateUserRequest } from "./types"


// POST
export const createUser = (payload: CreateUserRequest) => {
    console.log('kdp createUser');
}

export const authenticate = (username: string, password: string) => { //kdp revisit these params
    console.log('kdp authenticate');
    return axios.post(`http://localhost:5000/authenticate`, { username, password})
        .then(res => res.data);
}

// PUT
export const updateUser = (payload: UpdateUserRequest) => {
    console.log('kdp update user')
}

//DELETE
export const deleteUser = (id: string) => {
    console.log('kdp deleteUser')
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