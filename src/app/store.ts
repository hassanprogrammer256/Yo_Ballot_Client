import {configureStore} from '@reduxjs/toolkit'
import {overviewReducer} from "../features/votesSlice"
import voterReducer from '../features/voterSlice'


export const AppStore = configureStore({
    reducer:{
overviewReducer,
voterReducer
    }
})

