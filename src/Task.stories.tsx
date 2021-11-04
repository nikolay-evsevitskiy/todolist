import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


export default {
    title: 'TODOLIST/Task',
    component: Task,
    argTypes: {},
    args: {
        TodolistId: '1',
        taskId: '1',
        changeTaskStatus: action('changeTaskStatus'),
        removeTask: action('removeTask'),
        onChangeTaskTitle: action('onChangeTaskTitle')
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: '1', title: 'JSww', isDone: true})

    const changeStatus = () => setTask({id: '1', title: 'JSww', isDone: !task.isDone})
    const newArgs = {...args, task, changeTaskStatus: changeStatus}
    return <Task {...newArgs} />;
}

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    isDone: true,
    title: 'JS',
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    isDone: false,
    title: 'HTML',
};
