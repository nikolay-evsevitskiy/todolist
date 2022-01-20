import React, {useEffect} from 'react';
import './App.css';
import {AppRootStateType} from './store';
import {TaskType} from '../api/todolists-api';
import {AppBar, LinearProgress, Menu, Toolbar, Typography, Container, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button";
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, Navigate} from 'react-router-dom';
import {Login} from "../features/login/Login";
import {logoutTC} from "../features/login/auth-reducer";


export type TaskStateType = { [key: string]: Array<TaskType> }
type PropsType = {
    demo?: boolean
}

export default App;

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    const isLoggedOutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu open={false}/>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    News
                </Typography>
                {isLoggedIn && <Button onClick={isLoggedOutHandler} color='inherit'>Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
        </AppBar>
        <Container fixed>
            <Routes>
                <Route path="/" element={<TodolistsList demo={demo}/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="*" element={<Navigate to="404"/>}/>
                <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>
            <TodolistsList demo={demo}/>
        </Container>
    </div>
}


