import axios from "axios";
import type {voterLoginInterface } from "../interfaces/voter.interfaces";
import { API_URL } from "../config";




export const voterLoginApi = async(credentials: voterLoginInterface) => {
    const response = await axios.post(`${API_URL}/voter-login`,{credentials})
    return response
}