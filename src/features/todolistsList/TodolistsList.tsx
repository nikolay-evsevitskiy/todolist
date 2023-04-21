import {useActions, useAppSelector} from "../../app/store";
import {TodolistDomainType} from "./todolist/todolists-reducer";
import {useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components";
import {Todolist} from "./todolist/Todolist";
import {TaskStateType} from "../../app/App";
import {Navigate} from "react-router-dom";
import {authSelectors} from "../Auth";
import {todolistsActions} from "./index";


type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {
        addTodolist,
        fetchTodoLists
    } = useActions(todolistsActions)
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        fetchTodoLists()
    }, [demo, isLoggedIn])

    const addTodolistCallback = useCallback((title: string) => {
        addTodolist({title})
    }, [addTodolist])

    if (!isLoggedIn) {
        return <Navigate to="login"/>
    }
    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(tl => {
                let tasksForToDoList = tasks[tl.id]

                return <Grid item key={tl.id}>
                    <Paper style={{padding: '10px'}}>
                        <Todolist
                            todolist={tl}
                            key={tl.id}
                            tasks={tasksForToDoList}
                            demo={demo}
                        />
                    </Paper>
                </Grid>
            })
            }
        </Grid>
    </>
}
