import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../Todolist';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType, updateTodolistTitleTC,
} from "../state/todolists-reducer";
import {
    addTaskTC,
    removeTaskTC, updateTaskTC
} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from '../state/store';
import {TaskStatuses, TaskType} from '../api/todolists-api';
import {RequestStatusType} from "./app-reducer";
import {AppBar, Container, Grid, LinearProgress, Menu, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button";


export type TaskStateType = { [key: string]: Array<TaskType> }

export default AppWithRedux;

function AppWithRedux() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const addTask = useCallback((newTitle: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, newTitle))
    }, [dispatch])
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(id, todolistId))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, todolistId, {status}))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, todolistId: string, newValue: string) => {
        dispatch(updateTaskTC(id, todolistId, {title: newValue}))
    }, [dispatch])
    const onChangeTodolistTitle = useCallback((todolistId: string, newValue: string) => {
        dispatch(updateTodolistTitleTC(todolistId, newValue))
    }, [dispatch])


    return <div className="App">
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
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
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
