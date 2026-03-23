export type voterLoginResponse = {
    success?:boolean;
    access_token:string | '' |null;
    refresh_token: string | '' |null,
    error?:string
}

export type otpRequestResponseType = {success:boolean,error?:string,message?:string,otp?:string}