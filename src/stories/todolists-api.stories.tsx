import React, {useState} from 'react'
import {UpdateTaskModelType, todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const CallbackFunc = () => {
        todolistsApi.getTodoLists()
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>
        <button onClick={CallbackFunc}>Get todolists</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const CallbackFunc = () => {
        todolistsApi.createTodolist(title)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>
        <input type="text" placeholder={'title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={CallbackFunc}>Create todolist</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settodolistId] = useState<string>('')
    const CallbackFunc = () => {
        todolistsApi.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>
        <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            settodolistId(e.currentTarget.value)
        }}/>
        <button onClick={CallbackFunc}>Delete Todolist</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const CallBackFunc = () => {
        todolistsApi.updateTodolist(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>
        <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input type="text" placeholder={'title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={CallBackFunc}>Update todolist</button>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const callbackFunc = () => {
        todolistsApi.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>
        <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={callbackFunc}>Get</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const callbackFunc = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response)
            })
    }

    return <div>
        <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input type="text" placeholder={'taskId'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <button onClick={callbackFunc}>Delete</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const CreateCallback = () => {
        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder={'todolistId'} type='text' value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'title'} type='text' value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={CreateCallback}>Create</button>
        </div>
        <div> {JSON.stringify(state)}</div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [model, setModel] = useState<UpdateTaskModelType>({
        title: '',
        description: '',
        status: 0,
        priority: 2,
        startDate: '',
        deadline: ''
    })
    const callbackFunc = () => {
        todolistsApi.updateTask(todolistId, taskId, model)
            .then((response) => {
                setState(response)
            })
    }

    return <div>
        <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input type="text" placeholder={'taskId'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input type="text" placeholder={'Change title'} value={model.title} onChange={(e) => {
            setModel({...model, title: e.currentTarget.value})
        }}/>
        <button onClick={callbackFunc}>Change</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
