//thunks
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../app/app-reducer";
import {todolistsApi} from "../../../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../../../utils/error-utils";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";

export const fetchTodoListsTC = createAsyncThunk('todolists/fetchTodolists', async (params, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsApi.getTodoLists()
        return {todoLists: res.data}
    } catch (error) {
        if (error instanceof Error)
            handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}))
    }
})
export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (param: { todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: 'loading'}))
    try {
        await todolistsApi.deleteTodolist(param.todolistId)
        return {todolistId: param.todolistId}
    } catch (error) {
        if (error instanceof Error)
            handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (param: { title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsApi.createTodolist(param.title)
        if (res.data.resultCode === 0) {
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkAppError(error, dispatch)
            return rejectWithValue(null)
        }
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const updateTodolistTitleTC = createAsyncThunk('todolists/updateTodolistTitle', async (param: { todoListId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsApi.updateTodolist(param.todoListId, param.title)
        if (res.data.resultCode === 0) {
            return {id: param.todoListId, title: param.title}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (error instanceof Error)
            handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}))
    }
})
