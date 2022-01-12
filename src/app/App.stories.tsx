import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import App from './App';
import {ReduxStoreProviderDecorator} from "../stories/decorators/AppWithReduxProviderDecorator";


export default {
    title: 'TODOLIST/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App demo={true}/>;

export const AppStory = Template.bind({});

AppStory.args = {};

