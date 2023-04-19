import {TaskStateType} from "../../../../trash/App";
import {TaskStatuses, TodoTaskPriorities} from "../../../../api/todolists-api";
import {RequestStatusType} from "../../../../app/app-reducer";
import {createSlice} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../../common/action/common.actions";
import {addTodolistTC, fetchTodoListsTC, removeTodolistTC} from "../todolists-actions";
import {addTaskTC, fetchTaskTC, removeTaskTC, updateTaskTC} from "./tasks-actions";

const slice = createSlice({
    name: "tasks",
    initialState: {} as TaskStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                if (action.payload)
                    state[action.payload.todolist.id] = []
            })
            .addCase(fetchTodoListsTC.fulfilled, (state, action) => {
                action.payload.todoLists.forEach(i => {
                    state[i.id] = []
                })
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(clearTasksAndTodolists, () => {
                return {}
            })
            .addCase(fetchTaskTC.fulfilled, (state, action) => {
                if (action.payload)
                    state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(i => i.id === action.payload.taskID)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                if (action.payload)
                    state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
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

