import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";

const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'APP/SET-STATUS' :
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-ISINITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-ISINITIALIZED', isInitialized} as const)


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        dispatch(setIsInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
}


export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
type ActionTypes = SetAppStatusActionType
    | SetAppErrorActionType
    | SetAppIsInitializedActionType
