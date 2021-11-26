import {TaskStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType
const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskID)
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskID
                    ? {...t, status: action.taskStatus}
                    : t);
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            const todolistTasks = state[action.todolistId]
            if (todolistTasks) {
                state[action.todolistId] = todolistTasks
                    .map(t => t.id === action.taskID
                        ? {...t, title: action.TaskTitle}
                        : t);
            }
            return {...state}
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }


        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskID} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (taskID: string, taskStatus: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, taskStatus, todolistId} as const
}
export const changeTaskTitleAC = (taskID: string, todolistId: string, TaskTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskID, TaskTitle, todolistId} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}


export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })

}

export const changeTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasksFormState = getState().tasks
    const tasksForCurrentTodolist = allTasksFormState[todolistId]
    const task = tasksForCurrentTodolist.find(tl => {
        return tl.id === taskId
    })
    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        todolistsAPI.updateTask(todolistId, taskId, model).then(() => {
            dispatch(changeTaskStatusAC(taskId, status, todolistId))

        })
    }
}

export const changeTaskTitleTC = (taskId: string, todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks
    const tasksForCurrentTodolist = tasks[todolistId]
    const task = tasksForCurrentTodolist.find(tl => {
        return tl.id === taskId
    })
    if (task) {
        const model: UpdateTaskModelType = {
            title: title,
            status: task.status,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(() => {
                dispatch(changeTaskTitleAC(taskId, todolistId, title))
            })
    }
}