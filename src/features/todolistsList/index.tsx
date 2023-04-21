import { TodolistsList } from './TodolistsList'
import * as tasksActions from './todolist/task/tasks-actions'
import * as todolistsAsyncActions from './todolist/todolists-actions'
import {slice} from './todolist/todolists-reducer'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}
export {tasksActions, todolistsActions, TodolistsList}
