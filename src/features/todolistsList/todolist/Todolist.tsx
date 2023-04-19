import React, {useCallback} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./task/Task";
import {TodolistDomainType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {useActions} from "../../../app/store";
import {tasksActions, todolistsActions} from "./index";
import {RequestStatusType} from "../../../app/app-reducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist: React.FC<PropsType> = React.memo(({
                                                             demo = false,
                                                             todolist,
                                                             ...props
                                                         }) => {

    const {
        removeTodolist,
        updateTodolistTitle,
        changeTodolistFilterAC
    } = useActions(todolistsActions)
    const {addTask, removeTask, updateTask} = useActions(tasksActions)
    const removeTaskHandler = useCallback((id: string, newValue: RequestStatusType, todolistId: string) => {
        removeTask({taskId: id, todolistId})
    }, [removeTask])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        updateTask({taskId: id, todolistId: todolistId, domainModel: {status}})
    }, [updateTask])
    const changeTaskTitle = useCallback((id: string, todolistId: string, newValue: string) => {
        updateTask({taskId: id, todolistId: todolistId, domainModel: {title: newValue}})
    }, [updateTask])
    const addTaskHandler = useCallback((title: string) => {
        addTask({title: title, todolistId: todolist.id})
    }, [addTask])
    const removeTodolistHandler = () => {
        removeTodolist({todolistId: todolist.id})
    }
    const onAllClickHandler = useCallback(() => {
        changeTodolistFilterAC({filter: 'all', id: todolist.id})
    }, [changeTodolistFilterAC])
    const onActiveClickHandler = useCallback(() => {
        changeTodolistFilterAC({filter: 'active', id: todolist.id})
    }, [changeTodolistFilterAC])
    const onCompletedClickHandler = useCallback(() => {
        changeTodolistFilterAC({filter: 'completed', id: todolist.id})
    }, [changeTodolistFilterAC])
    const onChangeTodolistTitleHandler = useCallback((newValue: string) => {
        updateTodolistTitle({todoListId: todolist.id, title: newValue})
    }, [updateTodolistTitle])

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
                                      removeTask={removeTaskHandler}
                                      changeTaskStatus={changeStatus}
                                      onChangeTaskTitle={changeTaskTitle}
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

