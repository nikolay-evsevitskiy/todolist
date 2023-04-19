import {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    FilterValuesType,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';

import {v1} from 'uuid';
import {RequestStatusType} from "../../../app/app-reducer";
import {addTodolist, fetchTodoLists, removeTodolist, updateTodolistTitle} from "./todolists-actions";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const params = {todolistId: todolistId1};
    const endState = todolistsReducer(startState, removeTodolist.fulfilled(params, 'requestId', params))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";
    const todolistData = {
        id: "123421",
        title: newTodolistTitle,
        addedDate: '',
        order: 0

    }

    const endState = todolistsReducer(startState, addTodolist.fulfilled({todolist: todolistData}, 'requestId', {title: newTodolistTitle}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const params = {id: todolistId2, title: newTodolistTitle};
    const endState = todolistsReducer(startState, updateTodolistTitle.fulfilled(params, 'requestId', {
        title: newTodolistTitle,
        todoListId: params.id
    }));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entityStatus of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";


    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({id: todolistId2, status: newStatus}));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});

test('todolists should be set to the state', () => {

    const action = fetchTodoLists.fulfilled({todoLists: startState}, 'requestId')
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});
