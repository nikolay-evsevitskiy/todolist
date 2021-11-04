import React, {useCallback} from 'react';
import {FilterValuesType, TasksType} from './App';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons'
import {Task} from "./Task";

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filterTasks: (value: FilterValuesType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    onChangeTaskTitle: (id: string, todolistId: string, newValue: string) => void
    onChangeTodolistTitle: (todolistId: string, newValue: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist called")

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
        tasksForTodolist = props.tasks.filter(t => !t.isDone)

    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)

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
                                      isDone={t.isDone}
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
