import React, {useCallback} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./task/Task";
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {TaskType} from "../../../api/todolists-api";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {RequestStatusType} from "../../../app/app-reducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, newValue: RequestStatusType, todolistId: string) => void
    removeTodolist: (id: string) => void
    filterTasks: (value: FilterValuesType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    onChangeTaskTitle: (id: string, todolistId: string, newValue: string) => void
    onChangeTodolistTitle: (todolistId: string, newValue: string) => void
    demo?: boolean
}


export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    console.log("Todolist called")

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolist.id)
    }

    const onAllClickHandler = useCallback(() => {
        props.filterTasks('all', props.todolist.id)
    }, [props.filterTasks, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        props.filterTasks('active', props.todolist.id)
    }, [props.filterTasks, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        props.filterTasks('completed', props.todolist.id)
    }, [props.filterTasks, props.todolist.id])
    const onChangeTodolistTitle = useCallback((newValue: string) => {
        props.onChangeTodolistTitle(props.todolist.id, newValue)
    }, [props.onChangeTodolistTitle, props.todolist.id])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div className='Block'>

            <h3>
                <EditableSpan value={props.todolist.title} onChange={onChangeTodolistTitle}
                              disabled={props.todolist.entityStatus === 'loading'}/>
                <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {
                    tasksForTodolist.map(t => {
                            return <>
                                <Task key={t.id}
                                      taskId={t.id}
                                      TodolistId={props.todolist.id}
                                      status={t.status}
                                      title={t.title}
                                      removeTask={props.removeTask}
                                      changeTaskStatus={props.changeTaskStatus}
                                      onChangeTaskTitle={props.onChangeTaskTitle}
                                      entityStatus={props.todolist.entityStatus}
                                      entityTaskStatus={t.entityTaskStatus}
                                />
                            </>
                        }
                    )
                }
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'} color={'inherit'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? 'contained' : 'text'} color={'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

