import { createAsyncThunk ,createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type { voterInterface, voterLoginInterface } from "../interfaces/voter.interfaces"
import { voterLoginApi, voterLogOutApi } from "../api/voterlogin"
import { CheckPositionsRemaining } from "../api/voting_init"
import type { voterLoginResponse } from "../types/responses.types"


export const voterLoginThunk = createAsyncThunk('voterlogin', async(credentials:voterLoginInterface) => {

const response = await voterLoginApi(credentials)
return response

})

export const CheckRemainingVotesStatusThunk = createAsyncThunk('remaining-positions', async(reg_no:string | null) => {

    const data =  await CheckPositionsRemaining(reg_no) 
    return data;
})


export const CheckAuthThunk = createAsyncThunk('checkAuth', async() => {
    const access = sessionStorage.getItem('access')
    if (access){
        return true
    }else{
        return false
    }
})

export const LogOutThunk = createAsyncThunk('voter-logout',async(refresh_token:string|null|undefined) => {
    const response =  await voterLogOutApi(refresh_token)
    return response
})








const voterInitialState:voterInterface = {
    registration_number: sessionStorage.getItem('reg_no'),
    access_token: sessionStorage.getItem('access'),
    refresh_token: sessionStorage.getItem('refresh'),
    is_authenticated: false,
    has_completed_voting:false,
    remaining_positions:[],
    remaining_candidates:[],
    voted_candidates:[],

}

export const voterSlice =  createSlice({
    name:'voter',
    initialState: voterInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(voterLoginThunk.fulfilled, (state,action : PayloadAction<voterLoginResponse>) => {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            state.registration_number =  sessionStorage.getItem('reg_no')
            state.is_authenticated = true
        })

        .addCase(CheckAuthThunk.fulfilled,(state,action: PayloadAction<boolean>) => {
            state.is_authenticated = action.payload
        })
        .addCase(LogOutThunk.fulfilled, (state,action:PayloadAction<boolean>) => {
            if (action.payload === true){
                sessionStorage.setItem('access','')
                sessionStorage.setItem('refresh','')
                state.is_authenticated=false
            }
        })

        .addCase(CheckRemainingVotesStatusThunk.fulfilled,(state,action)=> {
            state.remaining_positions = action.payload.remaining_positions
            state.remaining_candidates = action.payload.remaining_candidates
            state.voted_candidates = action.payload.voted_candidates
            if (action.payload.remaining_positions.length <= 0){
                state.has_completed_voting = true
            }
        })
    }
})

export default voterSlice.reducer




