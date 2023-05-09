import {TodolistsList} from './TodolistsList'
import * as tasksActions from './todolist/task/tasks-actions'
import * as todolistsAsyncActions from './todolist/todolists-actions'
import {slice as todolistsSlice} from './todolist/todolists-reducer'
import {slice as taskSlice} from './todolist/task/tasks-reducer'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = taskSlice.reducer

export {tasksActions, todolistsActions, TodolistsList, todolistsReducer, tasksReducer}
