import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, setTodoListsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';

import {v1} from 'uuid';
import {RequestStatusType} from "../../../app/app-reducer";
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
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodolistAC({
        id: "123421",
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entityStatus of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";


    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2, newStatus));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});

test('todolists should be set to the state', () => {

    const action = setTodoListsAC(startState)
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});
