import axios from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TodoTaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: [string]
    data: D
}
type GetTasksResponseType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}
export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string | null
    deadline: string | null
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "4bd60911-e7ab-47b0-851f-962a07b6cbc2"
    }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }

}