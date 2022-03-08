import {AppRootStateType, useAppSelector} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTitleTC
} from "./todolist/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./todolist/task/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";
import {TaskStateType} from "../../app/App";
import {RequestStatusType} from "../../app/app-reducer";
import {Navigate} from "react-router-dom";

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(fetchTodoListsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const addTask = useCallback((newTitle: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, newTitle))
    }, [dispatch])
    const removeTask = useCallback((id: string, newValue: RequestStatusType, todolistId: string) => {
        dispatch(removeTaskTC(id, {entityTaskStatus: newValue}, todolistId))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, todolistId, {status}))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({id: todolistId, filter: value})
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, todolistId: string, newValue: string) => {
        dispatch(updateTaskTC(id, todolistId, {title: newValue}))
    }, [dispatch])
    const onChangeTodolistTitle = useCallback((todolistId: string, newValue: string) => {
        dispatch(updateTodolistTitleTC(todolistId, newValue))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to="login"/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
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
                            removeTask={removeTask}
                            removeTodolist={removeTodolist}
                            filterTasks={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            onChangeTaskTitle={changeTaskTitle}
                            onChangeTodolistTitle={onChangeTodolistTitle}
                            demo={demo}
                        />
                    </Paper>
                </Grid>
            })
            }
        </Grid>
    </>
}
