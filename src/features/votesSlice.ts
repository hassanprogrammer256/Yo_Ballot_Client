import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit'
import type { overviewInterface } from '../interfaces/votes.interfaces'
import { FetchOverviewDataApi } from '../api/voting_init';




export const FetchOverviewDataThunk  = createAsyncThunk('overview-data', async () => {
    const response = await FetchOverviewDataApi()
    return response;
})









const overviewInitialState: overviewInterface=[
{ label: 'Total Posts', value: 0},
  { label: 'Total Candidates', value: 0 },
  { label: 'Registered Voters', value: 0 },
  { label: 'Voters Turn Up', value: 0 }
]



const votesSlice = createSlice({
    name:'voting',
    initialState:overviewInitialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(FetchOverviewDataThunk.fulfilled, (state,action: PayloadAction<overviewInterface>) => {
            state[0].value = action.payload[0].value;
            state[1].value = action.payload[1].value;
            state[2].value = Number(action.payload[2].value);
            state[3].value = action.payload[3].value
        })
    }
})


export const overviewReducer = votesSlice.reducer;
