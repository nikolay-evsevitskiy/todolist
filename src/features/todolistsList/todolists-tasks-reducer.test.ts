import {TaskStateType} from "../../trash/App";
import {TodolistDomainType} from "./todolist/todolists-reducer";
import {addTodolist, fetchTodoLists} from "./todolist/todolists-actions";
import {tasksReducer, todolistsReducer} from "./index";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const param = {
        todolist: {
            id: "123421",
            title: "new todolist",
            addedDate: '',
            order: 0
        }
    };
    const action = addTodolist.fulfilled(param, 'requestId', {title: param.todolist.title});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
    if (action.payload)
        expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe("123421");
});
test('empty arrays should be added when we set todolists', () => {
    const updatePayload = {
        todoLists: [
            {id: '1', title: 'title1', order: 0, addedDate: ''},
            {id: '2', title: 'title2', order: 0, addedDate: ''}
        ]
    };
    const action = fetchTodoLists.fulfilled(updatePayload, 'requestId');

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);
    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});
