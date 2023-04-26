import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskStatuses, TodoTaskPriorities} from "../../../../api/todolists-api";


export default {
    title: 'TODOLIST/Task',
    component: Task,
    argTypes: {},
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        removeTask: action('removeTask'),
        onChangeTaskTitle: action('onChangeTaskTitle')
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({
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

    const changeStatus = () => setTask({
        id: '1',
        title: 'JSww',
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        description: '',
        entityTaskStatus: 'succeeded'
    })
    const newArgs = {...args, task, changeTaskStatus: changeStatus}
    // @ts-ignore
    return <Task {...newArgs} />;
}

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    // @ts-ignore
    status: TaskStatuses.Completed,
    title: 'JS',
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    // @ts-ignore
    status: TaskStatuses.Completed,
    title: 'HTML',
};
