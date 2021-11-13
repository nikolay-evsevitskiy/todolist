import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskStatuses, TodoTaskPriorities} from "./api/todolists-api";


export type TasksType = {
    id: string
    title: string
    status: TaskStatuses
}

export type TaskStateType = { [key: string]: Array<TasksType> }


function AppWithReducers() {

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }

    function addTask(newTitle: string, todolistId: string) {
        const action = addTaskAC(newTitle, todolistId)
        dispatchToTasks(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasks(action)
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTodolists(action)
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(id, status, todolistId)
        dispatchToTasks(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolists(action)
    }

    function onChangeTaskTitle(id: string, todolistId: string, newValue: string) {
        const action = changeTaskTitleAC(id, todolistId, newValue)
        dispatchToTasks(action)
    }

    function onChangeTodolistTitle(todolistId: string, newValue: string) {
        const action = changeTodolistTitleAC(todolistId, newValue)
        dispatchToTodolists(action)
    }

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
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
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
                id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: todolistId2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            }
        ]
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
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
                                        onChangeTaskTitle={onChangeTaskTitle}
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

export default AppWithReducers;
