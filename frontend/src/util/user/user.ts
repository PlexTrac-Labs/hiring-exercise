import axios from "axios";
import { CreateUserRequest, UpdateUserRequest } from "./types"


// POST
export const createUser = (payload: CreateUserRequest) => {
    console.log('kdp createUser');
}

export const authenticate = (username: string, password: string) => { //kdp revisit these params
    console.log('kdp authenticate');
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
    console.log('kdp get user')
    return axios.get(`http://localhost:5000/user/${id}`)
        .then(res => res.data)
}

export const getAllUsers = () => {
    console.log('kdp get all users')
    return axios.get(`http://localhost:5000/user`)
    .then(res => res.data)
}