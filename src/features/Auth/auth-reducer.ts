import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginTC, logoutTC} from "./auth-actions";

//reducer
export const slice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    }
})
// actions
export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions




