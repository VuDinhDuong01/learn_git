import { io } from "socket.io-client";
const token =localStorage.getItem("token")
const profile=JSON.parse(localStorage.getItem("profile") as string)

export const socket = io("http://localhost:3000",{
    auth: {
         token:token,
        profile:profile
    }
})