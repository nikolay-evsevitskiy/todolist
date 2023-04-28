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

export const Task: React.FC<TaskPropsType> = React.memo(({task, entityStatus}) => {
    const {removeTask, updateTask} = useActions(tasksActions)
    const removeTaskHandler = useCallback((id: string, newValue: RequestStatusType, todolistId: string) => {
        removeTask({taskId: id, todolistId})
    }, [removeTask])
    const onClickHandler = () => {
        removeTaskHandler(task.id, 'loading', task.todoListId)
    }
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            taskId: task.id,
            todolistId: task.todoListId,
            domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }, [updateTask])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        updateTask({taskId: task.id, todolistId: task.todoListId, domainModel: {title: newValue}})
    }, [updateTask])
    const disable = entityStatus === 'loading' || task.entityTaskStatus === 'loading'
    const checkedTask = task.status === TaskStatuses.Completed
    return <div key={task.id} style={{position: 'relative'}}
                className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={checkedTask}
            color={'primary'}
            onChange={onChangeHandler}
            disabled={disable}
        />
        <EditableSpan value={task.title}
                      onChange={onTitleChangeHandler}
                      disabled={disable}
                      checked={checkedTask}
        />
        <IconButton onClick={onClickHandler}
                    disabled={disable}
                    style={{position: 'absolute', top: '1px', right: '1px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </div>

})
