import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "./Task";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../../../../api/todolists-api";
import {ReduxStoreProviderDecorator} from "../../../../stories/decorators/AppWithReduxProviderDecorator";
import {RequestStatusType} from "../../../../app/app-reducer";


export default {
    title: 'TODOLIST/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState<TaskType>({
        id: '1',
        title: 'JSww',
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        description: '',
        entityTaskStatus: 'succeeded'
    })

    const entityStatus: RequestStatusType = 'loading'


    return <Task
        task={task}
        entityStatus={entityStatus}
    />;
}

// export const TaskIsDoneStory = Template.bind({});
// TaskIsDoneStory.args = {
//
//     status: TaskStatuses.Completed,
//     title: 'JS',
// };
//
// export const TaskIsNotDoneStory = Template.bind({});
//
// TaskIsNotDoneStory.args = {
//
//     status: TaskStatuses.Completed,
//     title: 'HTML',
// };
