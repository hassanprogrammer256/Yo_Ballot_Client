import axios from "axios";
import { API_URL } from "../config";
import type { otpRequestResponseType, voterLoginResponse } from "../types/responses.types";

export const voterLoginApi = async({reg_no,password} :{reg_no:string;password:string}) : Promise<voterLoginResponse> => {
    const response = await axios.post(`${API_URL}accounts/auth/login/`,{reg_no,password})
    if (response.status === 200){

        const access_tkn = response.data.access;
        const refresh_tkn = response.data.refresh;
        sessionStorage.setItem('access',access_tkn||'')
        sessionStorage.setItem('refresh',refresh_tkn||'')
        sessionStorage.setItem('reg_no',reg_no||'')

        return ({success:true, access_token:access_tkn,refresh_token:refresh_tkn}) as voterLoginResponse
}else{
    return ({error: "Network Error. Please Try Again"}) as voterLoginResponse
}
}
export const voterVerifyOtp = async({reg_no,code} :{reg_no:string;code:string}) : Promise<{success:boolean,password:string,error?:string}> => {
    const response = await axios.post(`${API_URL}accounts/auth/verify-otp/`,{reg_no,code})
    if (response.data.success){
        const password = response.data.password;
        return ({success:true, password:password})
}else{
    return ({success:false,password:'',error:response.data.error || "An Error Occured"}) 
}
}

export const voterRequestOTP = async(reg_no:string): Promise<otpRequestResponseType> => {
    const response = await axios.post(`${API_URL}accounts/auth/request-otp/`,{reg_no:reg_no})
if (response.status === 200){
return response.data as otpRequestResponseType
}else{
    return ({error: "Network Error. Please Try Again"}) as otpRequestResponseType
}
        
   
}

export const voterLogOutApi = async(refresh_token: string|null|undefined) : Promise<boolean> =>{
    const response =  await axios.post(`${API_URL}accounts/auth/logout/`,{refresh:refresh_token},{headers:{
        "Authorization": `Bearer ${sessionStorage.getItem('access')}`
    }})

    if (response.data.success){
        return true
    }else{
        return false
    }
}
