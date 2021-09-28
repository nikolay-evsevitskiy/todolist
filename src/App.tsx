import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterType = 'all' | 'completed' | 'active'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TaskStateType = { [key: string]: Array<TasksType> }

function App() {

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function addTask(newTitle: string, todolistId: string) {
        let task = {id: v1(), title: newTitle, isDone: false}
        let todolistTask = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTask]
        setTasks({...tasks})
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTask = tasks[todolistId]
        tasks[todolistId] = todolistTask.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(t => t.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTask = tasks[todolistId]
        let task = todolistTask.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }


    function changeFilter(value: FilterType, todolistId: string) {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function onChange(id: string, todolistId: string, newValue: string) {
        let todolistTask = tasks[todolistId]
        let task = todolistTask.find(t => t.id === id)
        if (task) {
            task.title = newValue
            setTasks({...tasks})
        }

    }

    function onChangeTodolistTitle(todolistId: string, newValue: string) {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.title = newValue
            setTodolists([...todolists])
        }
    }


    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: "What to learn",
            filter: 'all'
        },
        {
            id: todolistId2,
            title: "What to bye",
            filter: 'all'
        }
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'Graph QL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {

                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForToDoList = allTodolistTasks
                    if (tl.filter === 'active') {
                        tasksForToDoList = allTodolistTasks.filter(t => !t.isDone)

                    }
                    if (tl.filter === 'completed') {
                        tasksForToDoList = allTodolistTasks.filter(t => t.isDone)


                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        filterTasks={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        onChange={onChange}
                        onChangeTodolistTitle={onChangeTodolistTitle}
                    />

                })
            }

        </div>
    )
}

export default App;
