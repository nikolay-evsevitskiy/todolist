import {TaskStateType} from "../../../../trash/App";
import {TaskStatuses, TodoTaskPriorities} from "../../../../api/todolists-api";
import {RequestStatusType} from "../../../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../../common/action/common.actions";
import {addTodolist, fetchTodoLists, removeTodolist} from "../todolists-actions";
import {addTask, fetchTask, removeTask, updateTask} from "./tasks-actions";

const slice = createSlice({
    name: "tasks",
    initialState: {} as TaskStateType,
    reducers: {
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, taskStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(i => i.id === action.payload.taskId)
            if (index > -1) {
                tasks[index].entityTaskStatus = action.payload.taskStatus
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolist.fulfilled, (state, action) => {
                if (action.payload)
                    state[action.payload.todolist.id] = []
            })
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                action.payload.todoLists.forEach(i => {
                    state[i.id] = []
                })
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(clearTasksAndTodolists, () => {
                return {}
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                if (action.payload)
                    state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                if (action.payload)
                    state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                if (action.payload) {
                    const tasks = state[action.payload.todolistId]
                    // @ts-ignore
                    const index = tasks.findIndex(i => i.id === action.payload.taskId)
                    if (index > -1) {
                        tasks[index] = {...tasks[index], ...action.payload.domainModel}
                    }
                }

            })
    }
})
//reducer
export const tasksReducer = slice.reducer

export const {changeTaskEntityStatusAC} = slice.actions
//types
export type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
    entityTaskStatus?: RequestStatusType
}

