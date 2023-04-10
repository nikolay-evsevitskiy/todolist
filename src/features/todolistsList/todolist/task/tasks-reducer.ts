import {TaskStateType} from "../../../../trash/App";
import {addTodolistAC, removeTodolistAC, setTodoListsAC,} from "../todolists-reducer";
import {
    TaskStatuses,
    TaskType,
    todolistsApi,
    TodoTaskPriorities,
    UpdateTaskModelType
} from "../../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../../common/action/common.actions";

const initialState: TaskStateType = {}
const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(i => i.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskID: string, model: UpdateDomainModelTaskType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(i => i.id === action.payload.taskID)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(setTodoListsAC, (state, action) => {
                action.payload.todoLists.forEach(i => {
                    state[i.id] = []
                })
            })
            .addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(clearTasksAndTodolists, () => {
                    return {}
                }
            )
    }
})

//reducer
export const tasksReducer = slice.reducer

//actions
export const {removeTaskAC, addTaskAC, setTasksAC, updateTaskAC} = slice.actions
//thunks
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC({tasks: res.data.items, todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const removeTaskTC = (taskId: string, model: UpdateDomainModelTaskType, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(updateTaskAC({taskID: taskId, model, todolistId}))
    todolistsApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC({taskID: taskId, todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })

}
export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainModelTaskType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFormState = getState().tasks
        const tasksForCurrentTodolist = allTasksFormState[todolistId]
        const task = tasksForCurrentTodolist.find(tl => {
            return tl.id === taskId
        })
        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            }
            dispatch(setAppStatusAC({status: 'loading'}))
            todolistsApi.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {

                        dispatch(updateTaskAC({taskID: taskId, model: apiModel, todolistId}))
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((error: AxiosError) => {
                    handleServerNetworkAppError(error.message, dispatch)
                })
        }
    }

//types
type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
    entityTaskStatus?: RequestStatusType
}

