import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    title: string
    isDone: boolean
    taskId: string
    TodolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    onChangeTaskTitle: (id: string, todolistId: string, newValue: string) => void

}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.taskId, props.TodolistId)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskId, newIsDoneValue, props.TodolistId);
    }

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.onChangeTaskTitle(props.taskId, props.TodolistId, newValue)
    },[props.onChangeTaskTitle, props.taskId, props.TodolistId])
    return <div key={props.taskId} className={props.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.isDone}
            color={'primary'}
            onChange={onChangeHandler}
        />
        <EditableSpan value={props.title}
                      onChange={onTitleChangeHandler}
        />
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

})