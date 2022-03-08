import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses} from "../../../../api/todolists-api";
import IconButton from "@mui/material/IconButton/IconButton";
import {Checkbox} from "@mui/material";
import {Delete} from '@mui/icons-material';
import {RequestStatusType} from "../../../../app/app-reducer";

type TaskPropsType = {
    title: string
    status: TaskStatuses
    taskId: string
    TodolistId: string
    removeTask: (taskId: string, newValue: RequestStatusType, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    onChangeTaskTitle: (id: string, todolistId: string, newValue: string) => void
    entityStatus: RequestStatusType
    entityTaskStatus: RequestStatusType
}


export const Task = React.memo((props: TaskPropsType) => {
    const disable = props.entityTaskStatus === 'loading' || props.entityStatus === 'loading'
    const onClickHandler = () => {
        props.removeTask(props.taskId, 'loading', props.TodolistId)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        props.changeTaskStatus(props.taskId, newIsDoneValue, props.TodolistId);
    }

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.onChangeTaskTitle(props.taskId, props.TodolistId, newValue)
    }, [props.onChangeTaskTitle, props.taskId, props.TodolistId])

    return <div key={props.taskId} className={props.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.status === TaskStatuses.Completed}
            color={'primary'}
            onChange={onChangeHandler}
            disabled={disable}
        />
        <EditableSpan value={props.title}
                      onChange={onTitleChangeHandler}
                      disabled={disable}
        />
        <IconButton onClick={onClickHandler} disabled={disable}>
            <Delete/>
        </IconButton>
    </div>

})
