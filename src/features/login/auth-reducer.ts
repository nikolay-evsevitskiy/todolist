import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../common/action/common.actions";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})
//reducer
export const authReducer = slice.reducer
// actions
export const {setIsLoggedInAC} = slice.actions


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(clearTasksAndTodolists())
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
