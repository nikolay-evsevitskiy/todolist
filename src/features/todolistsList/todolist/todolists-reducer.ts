import {todolistsApi, TodolistType} from "../../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../common/action/common.actions";


//thunks
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

const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(i => i.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(i => i.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearTasksAndTodolists, () => {
                return []
            })
            .addCase(fetchTodoListsTC.fulfilled, (state, action) => {
                return action.payload.todoLists.map(i => ({...i, filter: "all", entityStatus: "idle"}))
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(i => i.id === action.payload.todolistId)
                index > -1 && state.splice(index, 1)
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                if (action.payload)
                    state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            })
            .addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(i => i.id === action.payload.id)
                state[index].title = action.payload.title
            })
    }
})

//reducer
export const todolistsReducer = slice.reducer

export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC
} = slice.actions


//types
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'completed' | 'active'



