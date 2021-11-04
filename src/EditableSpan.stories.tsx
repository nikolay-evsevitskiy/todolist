import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argTypes: {},
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => {
    // const [ss, setS]= useState(false)
    // const newArgs = {...args, ss, setS}

    return <EditableSpan {...args} />;
}

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    value: 'Start value',
    onChange: action('EditableSpan was change')
};