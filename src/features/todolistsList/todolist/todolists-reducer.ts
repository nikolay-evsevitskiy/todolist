import {TodolistType} from "../../../api/todolists-api";
import {RequestStatusType} from "../../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../common/action/common.actions";
import {addTodolistTC, fetchTodoListsTC, removeTodolistTC, updateTodolistTitleTC} from "./todolists-actions";


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



