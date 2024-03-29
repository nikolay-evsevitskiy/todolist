import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from "../../app/store";
import {TaskStatuses, TodoTaskPriorities} from "../../api/todolists-api";
import {appReducer} from "../../app/app-reducer";
import thunk from "redux-thunk";
import {tasksReducer, todolistsReducer} from "../../features/todolistsList";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                entityTaskStatus: 'idle',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                entityTaskStatus: 'idle',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                entityTaskStatus: 'idle',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                entityTaskStatus: 'idle',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: ''
            }
        ]
    },
    app: {
        status: 'succeeded',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}>
        {/*{storyFn()}*/}
    </Provider>)
