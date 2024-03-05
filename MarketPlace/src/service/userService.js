import axios from "axios";


const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export const userService = {

    async getAllUser() {

        let response = await apiClient.get("/users");

        let allUser = response.data

        return allUser;
    },
}