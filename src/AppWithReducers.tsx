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


function AppWithReducers() {

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }

    function addTask(newTitle: string, todolistId: string) {
        const action = addTaskAC(newTitle, todolistId)
        dispatchToTasks(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasks(action)
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTodolists(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchToTasks(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolists(action)
    }

    function onChange(id: string, todolistId: string, newValue: string) {
        const action = changeTaskTitleAC(id, todolistId, newValue)
        dispatchToTasks(action)
    }

    function onChangeTodolistTitle(todolistId: string, newValue: string) {
        const action = changeTodolistTitleAC(todolistId, newValue)
        dispatchToTodolists(action)
    }

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {
            id: todolistId1,
            title: "What to learn",
            filter: 'all'
        },
        {
            id: todolistId2,
            title: "What to bye",
            filter: 'all'
        }
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'Graph QL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    })

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

export default AppWithReducers;
