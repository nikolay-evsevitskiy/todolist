import React from 'react';
import './App.css';
import {useAppSelector} from './store';
import {TaskType} from '../api/todolists-api';
import {AppBar, LinearProgress, Menu, Toolbar, Typography, Container} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button";
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./app-reducer";

export type TaskStateType = { [key: string]: Array<TaskType> }
type PropsType = {
    demo?: boolean
}

export default App;

function App({demo = false}: PropsType) {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (<div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    )
}


