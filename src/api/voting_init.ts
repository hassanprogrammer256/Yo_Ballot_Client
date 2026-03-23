import axios from "axios"
import { API_URL } from "../config"
import type { overviewInterface } from "../interfaces/votes.interfaces"
import type { postsType } from "../types/store.types"



export const FetchOverviewDataApi = async(): Promise<overviewInterface> => {
    const response = await axios.get(`${API_URL}api/overview/`,{headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('access')}`
}})
    if (response.data?.success){
       const data = [
{ label: 'Total Posts', value: response.data?.data?.total_posts },
  { label: 'Total Candidates', value: response.data?.data?.total_candidates},
  { label: 'Registered Voters', value: response.data?.data?.registered_voters},
  { label: 'Voters Turn Up', value: response.data?.data?.voter_turn_up}
       ]
       return data as overviewInterface
    }else{
        return [
{ label: 'Total Posts', value: 0},
  { label: 'Total Candidates', value: 0 },
  { label: 'Registered Voters', value: 0 },
  { label: 'Voters Turn Up', value: 0 }
]

    }

}


export const PostsDataApi = async(): Promise <postsType> => {
    const response = await axios.get(`${API_URL}api/all-posts-data/`,{headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('access')}`
}})
    if (response.data?.success){
        const data = response.data?.data
        return data as postsType
    }else{
        return [] as postsType
    }
}

export const CheckPositionsRemaining = async(reg_no: string | null): Promise<{remaining_positions:number[], remaining_candidates:number[],voted_candidates:number[]}> =>  {
const response = await axios.post(`${API_URL}api/user/voter-progress/`,{reg_no:reg_no},{headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('access')}`
}})

const data ={
    remaining_candidates: response.data.remaining_candidates,
    remaining_positions: response.data.remaining_positions,
    voted_candidates: response.data.voted_candidates
    
    }
    return data;
}



export const userVoteApi = async(reg_no:string | null,candidate_id:number) => {
    const response = await axios.post(`${API_URL}api/user/vote/`,{reg_no:reg_no,candidate_id:candidate_id},{headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('access')}`
}})
    if (response.status ===200){
        return ({
            success:true,
            message: "Vote Registered Successfully"
        })
    }else{
        return ({
            success:false,
            error: "Vote Not registered, Something Went Wrong",


        })
    }
}