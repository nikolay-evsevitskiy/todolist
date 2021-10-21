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
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store';


export type FilterValuesType = 'all' | 'completed' | 'active'
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = { [key: string]: Array<TasksType> }


function AppWithRedux() {

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)

    }

    function addTask(newTitle: string, todolistId: string) {
        const action = addTaskAC(newTitle, todolistId)
        dispatch(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }

    function onChange(id: string, todolistId: string, newValue: string) {
        const action = changeTaskTitleAC(id, todolistId, newValue)
        dispatch(action)
    }

    function onChangeTodolistTitle(todolistId: string, newValue: string) {
        const action = changeTodolistTitleAC(todolistId, newValue)
        dispatch(action)
    }


    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();

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
                                tasksForToDoList = allTodolistTasks.filter(t => !t.isDone)

                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = allTodolistTasks.filter(t => t.isDone)


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
                                        onChange={onChange}
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

export default AppWithRedux;
