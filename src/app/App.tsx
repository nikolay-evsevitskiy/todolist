import React from 'react';
import './App.css';
import {useAppSelector} from '../state/store';
import {TaskType} from '../api/todolists-api';
import {RequestStatusType} from "../state/app-reducer";
import {AppBar, LinearProgress, Menu, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button";
import {TodolistsList} from "../features/todolistsList/TodolistsList";


export type TaskStateType = { [key: string]: Array<TaskType> }

export default App;

function App() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)

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
        <TodolistsList/>
    </div>
}


