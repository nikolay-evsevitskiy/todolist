import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api';



export type TaskStateType = { [key: string]: Array<TaskType> }

export default AppWithRedux;

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((newTitle: string, todolistId: string) => {
        const action = addTaskAC(newTitle, todolistId)
        dispatch(action)
    }, [dispatch])
    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const action = changeTaskStatusAC(id, status, todolistId)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, todolistId: string, newValue: string) => {
        const action = changeTaskTitleAC(id, todolistId, newValue)
        dispatch(action)
    }, [dispatch])
    const onChangeTodolistTitle = useCallback((todolistId: string, newValue: string) => {
        const action = changeTodolistTitleAC(todolistId, newValue)
        dispatch(action)
    }, [dispatch])


    return <div className="App">
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
                        let tasksForToDoList = tasks[tl.id]

                        return <Grid item key={tl.id}>
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
                                    onChangeTaskTitle={changeTaskTitle}
                                    onChangeTodolistTitle={onChangeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    </div>
}
