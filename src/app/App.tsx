import React, {useCallback, useEffect} from "react";
import "./App.css";
import {TaskType} from "../api";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Menu,
    Toolbar,
    Typography
} from "@mui/material";
import {ErrorSnackbar} from "../components";
import {initializeAppTC} from "./app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import {authActions, authSelectors, Login} from "../features/Auth";
import {selectIsInitialized, selectStatus} from "./selectors";
import {TodolistsList} from "../features/todolistsList";
import {useActions} from "./store";


export type TaskStateType = { [key: string]: Array<TaskType> }
type PropsType = {
    demo?: boolean
}

export default App;

function App({demo = false}: PropsType) {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const dispatch = useDispatch()
    const {logoutTC} = useActions(authActions)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const isLoggedOutHandler = useCallback(() => {
        logoutTC()
    }, [logoutTC])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu open={false}/>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    To Do List
                </Typography>
                {isLoggedIn && <div><Button color='warning' onClick={isLoggedOutHandler}>log out</Button></div>}
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
        </Container>
    </div>
}


