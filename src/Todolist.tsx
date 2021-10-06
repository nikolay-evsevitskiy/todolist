import React, {ChangeEvent} from 'react';
import {TasksType, FilterType} from './App';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons'

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filterTasks: (value: FilterType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    onChange: (id: string, todolistId: string, newValue: string) => void
    onChangeTodolistTitle: (todolistId: string, newValue: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => {
        props.filterTasks('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.filterTasks('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.filterTasks('completed', props.id)
    }
    const onChangeTodolistTitle = (newValue: string) => {
        props.onChangeTodolistTitle(props.id, newValue)

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
                    props.tasks.map(t => {
                            const onClickHandler = () => {
                                props.removeTask(t.id, props.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                            }
                            const onChange = (newValue: string) => {
                                props.onChange(t.id, props.id, newValue)
                            }
                            return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                                <Checkbox
                                    checked={t.isDone}
                                    color={'primary'}
                                    onChange={onChangeHandler}
                                />
                                <EditableSpan value={t.title}
                                              onChange={onChange}
                                />
                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        }
                    )
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'} color={'inherit'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'} color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'} color={'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}