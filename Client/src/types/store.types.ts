import {AppStore} from '../app/store'

export type AppState=ReturnType<typeof AppStore.getState >
export type AppDispatch = ReturnType <typeof AppStore.dispatch>