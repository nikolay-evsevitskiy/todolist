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


export const Todolist: React.FC<PropsType> = React.memo(({
                                                             demo = false,
                                                             todolist,
                                                             addTask,
                                                             filterTasks,
                                                             onChangeTodolistTitle,
                                                             ...props
                                                         }) => {

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [addTask, todolist.id])

    const removeTodolistHandler = () => {
        props.removeTodolist(todolist.id)
    }

    const onAllClickHandler = useCallback(() => {
        filterTasks('all', todolist.id)
    }, [filterTasks, todolist.id])
    const onActiveClickHandler = useCallback(() => {
        filterTasks('active', todolist.id)
    }, [filterTasks, todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        filterTasks('completed', todolist.id)
    }, [filterTasks, todolist.id])
    const onChangeTodolistTitleHandler = useCallback((newValue: string) => {
        onChangeTodolistTitle(todolist.id, newValue)
    }, [onChangeTodolistTitle, todolist.id])

    let tasksForTodolist = props.tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div className='Block'>

            <h3>
                <EditableSpan value={todolist.title} onChange={onChangeTodolistTitleHandler}
                              disabled={todolist.entityStatus === 'loading'}/>
                <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
            <div>
                {
                    tasksForTodolist.map(t => {
                            return <div key={t.id}>
                                <Task key={t.id}
                                      taskId={t.id}
                                      TodolistId={todolist.id}
                                      status={t.status}
                                      title={t.title}
                                      removeTask={props.removeTask}
                                      changeTaskStatus={props.changeTaskStatus}
                                      onChangeTaskTitle={props.onChangeTaskTitle}
                                      entityStatus={todolist.entityStatus}
                                      entityTaskStatus={t.entityTaskStatus}
                                />
                            </div>
                        }
                    )
                }
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button variant={todolist.filter === 'all' ? 'contained' : 'text'} color={'inherit'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : 'text'} color={'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

