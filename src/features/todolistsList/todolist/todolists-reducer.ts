import {todolistsApi, TodolistType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../utils/error-utils";
import {AxiosError} from "axios";


const initialState: Array<TodolistDomainType> = []

//reducer
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType)
    : Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', todolistId}) as const
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter}) as const
export const setTodoListsAC = (todoLists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todoLists}) as const
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)


//thunks
export const fetchTodoListsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsApi.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const updateTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodolist(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todoListId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}

//types
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'completed' | 'active'
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodoListsActionType
    | SetAppStatusActionType
    | SetAppErrorActionType



