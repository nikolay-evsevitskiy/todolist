import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//thunks
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}))
    }
})
//reducer
const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initializeAppTC.fulfilled, (state) => {
                state.isInitialized = true
            })
    }
})
//reducer
export const appReducer = slice.reducer
//actions
export const {setAppStatusAC, setAppErrorAC} = slice.actions
//types
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
