import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../components";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import IconButton from "@mui/material/IconButton/IconButton";
import {Checkbox} from "@mui/material";
import {Delete} from '@mui/icons-material';
import {RequestStatusType} from "../../../../app/app-reducer";
import {useActions} from "../../../../app/store";
import {tasksActions} from "../../index";

type TaskPropsType = {
    task: TaskType
    entityStatus: RequestStatusType
}


export const Task: React.FC<TaskPropsType> = React.memo(({task, ...props}) => {
    const {removeTask, updateTask} = useActions(tasksActions)
    const removeTaskHandler = useCallback((id: string, newValue: RequestStatusType, todolistId: string) => {
        removeTask({taskId: id, todolistId})
    }, [removeTask])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        updateTask({taskId: id, todolistId: todolistId, domainModel: {status}})
    }, [updateTask])
    const changeTaskTitle = useCallback((id: string, todolistId: string, newValue: string) => {
        updateTask({taskId: id, todolistId: todolistId, domainModel: {title: newValue}})
    }, [updateTask])
    const disable = task.entityTaskStatus === 'loading' || props.entityStatus === 'loading'
    const onClickHandler = () => {
        removeTaskHandler(task.id, 'loading', task.todoListId)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        changeStatus(task.id, newIsDoneValue, task.todoListId);
    }

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, task.todoListId, newValue)
    }, [changeTaskTitle])

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color={'primary'}
            onChange={onChangeHandler}
            disabled={disable}
        />
        <EditableSpan value={task.title}
                      onChange={onTitleChangeHandler}
                      disabled={disable}
        />
        <IconButton onClick={onClickHandler} disabled={disable}>
            <Delete/>
        </IconButton>
    </div>

})
