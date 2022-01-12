import {TaskStateType} from "../../../../trash/App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from "../todolists-reducer";
import {
    TaskStatuses,
    TaskType,
    todolistsApi,
    TodoTaskPriorities,
    UpdateTaskModelType
} from "../../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../app/store";
import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../../utils/error-utils";

const initialState: TaskStateType = {}

//reducer
export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskID: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskID}) as const
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task}) as const
export const updateTaskAC = (taskID: string, model: UpdateDomainModelTaskType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskID, model, todolistId}) as const
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId}) as const

//thunks
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAppError(error.message, dispatch)
        })

}
export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainModelTaskType) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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
            todolistsApi.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, apiModel, todolistId))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((error) => {
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
}
type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsActionType
    | ReturnType<typeof setTasksAC>
    | SetAppStatusActionType
    | SetAppErrorActionType

