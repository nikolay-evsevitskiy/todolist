import {todolistsApi, TodolistType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppStatusAC
} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../utils/error-utils";
import {AxiosError} from "axios";
import {fetchTaskTC} from "./task/tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        clearDataAC(state) {
            state = []
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(i => i.id === action.payload.todolistId)
            index > -1 && state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(i => i.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(i => i.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodolistType> }>) {
            return action.payload.todoLists.map(i => ({...i, filter: "all", entityStatus: "idle"}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(i => i.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    }
})

//reducer
export const todolistsReducer = slice.reducer
//     (state: Array<TodolistDomainType> = initialState, action: ActionsType)
//     : Array<TodolistDomainType> => {
//     switch (action.type) {
//         case "SET-TODOLISTS":
//             return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.todolistId)
//         case 'ADD-TODOLIST':
//             return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         case 'CHANGE-TODOLIST-ENTITY-STATUS':
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//         case 'CLEAR-DATA':
//             return []
//         default:
//             return state
//     }
// }

//actions

export const {
    clearDataAC,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodoListsAC,
    changeTodolistEntityStatusAC
} = slice.actions
// export const clearDataAC = () => ({type: "CLEAR-DATA"} as const)
// export const removeTodolistAC = (todolistId: string) =>
//     ({type: 'REMOVE-TODOLIST', todolistId}) as const
// export const addTodolistAC = (todolist: TodolistType) =>
//     ({type: 'ADD-TODOLIST', todolist}) as const
// export const changeTodolistTitleAC = (id: string, title: string) =>
//     ({type: 'CHANGE-TODOLIST-TITLE', id, title}) as const
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
//     ({type: 'CHANGE-TODOLIST-FILTER', id, filter}) as const
// export const setTodoListsAC = (todoLists: Array<TodolistType>) =>
//     ({type: 'SET-TODOLISTS', todoLists}) as const
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
//     type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
// } as const)


//thunks
export const fetchTodoListsTC = () => (dispatch: any) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsAC({todoLists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data
        })
        .then((todos) => {
            todos.forEach(tl => {
                dispatch(fetchTaskTC(tl.id))
            })
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    todolistsApi.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC({todolistId: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkAppError(error.message, dispatch)
        })
}
export const updateTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.updateTodolist(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({id: todoListId, title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>


