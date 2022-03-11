 import {TaskStateType} from "../../trash/App";
// import {tasksReducer} from "./todolist/task/tasks-reducer";
// import {addTodolistAC, setTodoListsAC, TodolistDomainType, todolistsReducer} from "./todolist/todolists-reducer";
//
// test('ids should be equals', () => {
//     const startTasksState: TaskStateType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];
//
//     const action = addTodolistAC({
//         id: "123421",
//         title: "new todolist",
//         addedDate: '',
//         order: 0
//     });
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     //expect(idFromTasks).toBe(action.todolistId);
//     expect(idFromTodolists).toBe("123421");
// });
// // test('empty arrays should be added when we set todolists', () => {
// //     const action = setTodoListsAC([
// //         {id: '1', title: 'title1', order: 0, addedDate: ''},
// //         {id: '2', title: 'title2', order: 0, addedDate: ''}
// //     ]);
//
//     const endState = tasksReducer({}, action)
//
//     const keys = Object.keys(endState);
//     expect(keys.length).toBe(2)
//     expect(endState['1']).toStrictEqual([]);
//     expect(endState['2']).toStrictEqual([]);
// });
