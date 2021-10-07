import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let newState = state
            newState = newState.filter(t => t.id !== action.id)
            return newState
        case 'ADD-TODOLIST':
            let newTodolistId = v1()
            let newTodolist: TodolistType = {
                id: newTodolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state,
               newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            let newStat = [...state]
            let todolist = newStat.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return newStat
        case 'CHANGE-TODOLIST-FILTER':
            let newData = [...state]
            let todolistObject = newData.find(t => t.id === action.id)
            if (todolistObject) {
                todolistObject.filter = action.filter
            }
            return newData

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

