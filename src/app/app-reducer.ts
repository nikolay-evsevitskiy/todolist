import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//state
const initialState: InitialStateType = {
    status: "loading",
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }

    }
})
//reducer
export const appReducer = slice.reducer


//actions
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
            } else {
            }
        })
        .finally(() => {
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}

//types
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
