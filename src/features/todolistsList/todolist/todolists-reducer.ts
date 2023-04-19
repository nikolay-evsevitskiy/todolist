import {TodolistType} from "../../../api/todolists-api";
import {RequestStatusType} from "../../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../common/action/common.actions";
import {addTodolist, fetchTodoLists, removeTodolist, updateTodolistTitle} from "./todolists-actions";


export const slice = createSlice({
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
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                return action.payload.todoLists.map(i => ({...i, filter: "all", entityStatus: "idle"}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(i => i.id === action.payload.todolistId)
                index > -1 && state.splice(index, 1)
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                if (action.payload)
                    state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
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



