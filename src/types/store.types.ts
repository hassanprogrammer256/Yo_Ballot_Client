import {AppStore} from '../app/store'
import type { PostInterface } from '../interfaces/votes.interfaces';

export type AppState=ReturnType<typeof AppStore.getState >
export type AppDispatch = typeof AppStore.dispatch

export  type postsType = Array<PostInterface>;