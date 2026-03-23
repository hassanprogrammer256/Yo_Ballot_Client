import {type TypedUseSelectorHook,useDispatch,useSelector} from 'react-redux'
import { type AppDispatch, type AppState } from '../types/store.types'


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> =  useSelector