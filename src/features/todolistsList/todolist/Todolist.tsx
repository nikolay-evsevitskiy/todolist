import React, {useCallback, useEffect} from 'react';
import {AddItemForm, EditableSpan} from "../../../components";
import {Task} from "./task";
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {useActions} from "../../../app/store";
import {tasksActions, todolistsActions} from "../index";
import {RequestStatusType} from "../../../app/app-reducer";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";

export const Todolist: React.FC<PropsType> = React.memo(({demo = false, todolist, ...props}) => {
    const {removeTodolist, updateTodolistTitle, changeTodolistFilterAC} = useActions(todolistsActions)
    const {addTask, removeTask, updateTask, fetchTask} = useActions(tasksActions)
    useEffect(() => {
        if (demo) {
            return
        }
        fetchTask(todolist.id)
    }, [])
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
    const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) => {
        changeTodolistFilterAC({filter: filter, id: todolist.id})
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
    const renderFilterButton = (buttonFilter: FilterValuesType, color: ColorType, text: string) => {
        return <Button variant={todolist.filter === buttonFilter ? 'outlined' : 'text'} color={color}
                       onClick={() => onFilterButtonClickHandler(buttonFilter)}>
            {text}
        </Button>
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
                {renderFilterButton('all', 'inherit', 'All')}
                {renderFilterButton('active', 'primary', 'Active')}
                {renderFilterButton('completed', 'secondary', 'Completed')}
            </div>
        </div>
    )
})

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}
type ColorType = OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides>
