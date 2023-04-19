import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../../app/app-reducer";
import {todolistsApi, UpdateTaskModelType} from "../../../../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../../../../utils/error-utils";
import {AppRootStateType} from "../../../../app/store";
import {UpdateDomainModelTaskType} from "./tasks-reducer";

export const fetchTaskTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsApi.getTasks(todolistId)
        const tasks = res.data.items
        return {tasks, todolistId}
    } catch (error) {
        if (error instanceof Error)
            handleServerNetworkAppError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        await todolistsApi.deleteTask(param.todolistId, param.taskId)
        return {taskID: param.taskId, todolistId: param.todolistId}
    } catch (error) {
        if (error instanceof Error)
            handleServerNetworkAppError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsApi.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            return res.data.data.item
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkAppError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, todolistId: string, domainModel: UpdateDomainModelTaskType }, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const state = getState() as AppRootStateType
    const allTasksFormState = state.tasks
    const tasksForCurrentTodolist = allTasksFormState[param.todolistId]
    const task = tasksForCurrentTodolist.find(tl => {
        return tl.id === param.taskId
    })
    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.domainModel
    }
    const res = await todolistsApi.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            return param
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
