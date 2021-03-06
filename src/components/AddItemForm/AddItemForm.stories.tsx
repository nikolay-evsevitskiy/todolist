import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    argTypes: {},
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
export const AddItemFormDisabledStory = Template.bind({});

AddItemFormStory.args = {
    addItem: action('Button inside from clicked')
};

AddItemFormDisabledStory.args = {
    disabled: true,
    addItem: action('Button inside from clicked')
};