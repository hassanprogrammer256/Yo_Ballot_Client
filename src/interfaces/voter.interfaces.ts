

export interface voterInterface{
    registration_number:string | '' |null;
    is_authenticated:boolean;
    access_token?:string | '' |null;
    refresh_token?: string | '' |null,
    has_completed_voting:boolean;
    remaining_positions :number[] | []
    remaining_candidates :number[] | []
    voted_candidates :number[] | []


}

export interface voterLoginInterface{
    reg_no:string;
    password:string;
}


