import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from '../features/todolistsList/todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../features/todolistsList/todolist/todolists-reducer";
import {AppBar, Button, Container, Grid, Menu, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";


export type TaskStateType = { [key: string]: Array<TaskType> }


function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {
            id: todolistId1,
            title: "What to learn",
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: todolistId2,
            title: "What to bye",
            filter: 'all',
            addedDate: '',
            order: 0
        }
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistId1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistId1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'ReactJS', status: TaskStatuses.New, todoListId: todolistId1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'Rest API', status: TaskStatuses.New, todoListId: todolistId1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'Graph QL', status: TaskStatuses.New, todoListId: todolistId1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            }
        ],
        [todolistId2]: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: todolistId2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.New, todoListId: todolistId2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            }
        ]
    })


    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistDomainType = {
            id: newTodolistId,
            title: title,
            filter: 'all',
            addedDate: '',
            order: 0
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function addTask(newTitle: string, todolistId: string) {
        let task = {
            id: v1(), title: newTitle, status: TaskStatuses.New, todoListId: todolistId, startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
        }
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

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        let todolistTask = tasks[todolistId]
        let task = todolistTask.find(t => t.id === id)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
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


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu open/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {

                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForToDoList = allTodolistTasks
                            if (tl.filter === 'active') {
                                tasksForToDoList = allTodolistTasks.filter(t => t.status === TaskStatuses.New)

                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)


                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
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
                                        onChangeTaskTitle={onChange}
                                        onChangeTodolistTitle={onChangeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
