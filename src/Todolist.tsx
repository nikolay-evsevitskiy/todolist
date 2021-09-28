import React, {ChangeEvent} from 'react';
import {TasksType, FilterType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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


    return (
        <div className='Block'>

            <h3>{props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
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
                            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                <EditableSpan value={t.title}
                                              onChange={onChange}
                                />
                                <button onClick={onClickHandler}>X
                                </button>
                            </li>
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}
                >All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}