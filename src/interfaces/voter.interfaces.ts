export interface voterInterface{
    registration_number:number | null;
    is_authenticated:boolean;
    access_token:string | null;


}

export interface voterLoginInterface{
    registration_number:string;
    phone_number?:string;
    password:string;

}