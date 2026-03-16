import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit"
import type { voterInterface, voterLoginInterface } from "../interfaces/voter.interfaces"
import { voterLoginApi } from "../api/voterlogin"






export const voterLoginThunk = createAsyncThunk('voterlogin', async(credentials:voterLoginInterface) => {

const response = await voterLoginApi(credentials)
return response

})











const voterInitialState:voterInterface = {
    registration_number: null,
    access_token: null,
    is_authenticated: false
}

export const voterSlice =  createSlice({
    name:'voter',
    initialState: voterInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(voterLoginThunk.fulfilled, (state,action) => {
            state.access_token = action.payload.data.access_token
            state.is_authenticated = true
        })
    }
})




