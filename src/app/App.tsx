import React from 'react';
import './App.css';
import {AppRootStateType} from './store';
import {TaskType} from '../api/todolists-api';
import {AppBar, LinearProgress, Menu, Toolbar, Typography, Container} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button";
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import {Login} from "../features/login/Login";


export type TaskStateType = { [key: string]: Array<TaskType> }
type PropsType = {
    demo?: boolean
}

export default App;

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    return <BrowserRouter>
        <div className="App">
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
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    </BrowserRouter>


}


