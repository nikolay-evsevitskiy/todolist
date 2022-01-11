import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./task/Task";
import {FilterValuesType} from "./todolists-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTaskTC} from "./task/tasks-reducer";
import {TaskType} from "../../../api/todolists-api";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filterTasks: (value: FilterValuesType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    filter: FilterValuesType
    onChangeTaskTitle: (id: string, todolistId: string, newValue: string) => void
    onChangeTodolistTitle: (todolistId: string, newValue: string) => void
}

function Delete() {
    return null;
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist called")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTaskTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = useCallback(() => {
        props.filterTasks('all', props.id)
    }, [props.filterTasks, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.filterTasks('active', props.id)
    }, [props.filterTasks, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.filterTasks('completed', props.id)
    }, [props.filterTasks, props.id])
    const onChangeTodolistTitle = useCallback((newValue: string) => {
        props.onChangeTodolistTitle(props.id, newValue)
    }, [props.onChangeTodolistTitle, props.id])

    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)

    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)

    }
    return (
        <div className='Block'>

            <h3>
                <EditableSpan value={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(t => {
                            return <>
                                <Task key={t.id}
                                      taskId={t.id}
                                      TodolistId={props.id}
                                      status={t.status}
                                      title={t.title}
                                      removeTask={props.removeTask}
                                      changeTaskStatus={props.changeTaskStatus}
                                      onChangeTaskTitle={props.onChangeTaskTitle}
                                />
                            </>
                        }
                    )
                }
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} color={'inherit'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color={'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

