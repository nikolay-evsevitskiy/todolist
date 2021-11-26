import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TaskStateType} from '../App';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskStatuses, TodoTaskPriorities} from "../api/todolists-api";

let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, description: ''
            }
        ]
    });

});

test('correct task should be added to correct array', () => {
    const newTask = {
        id: "4",
        title: "juice",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        description: ''
    }

    const action = addTaskAC(newTask);
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][0].id).toBeDefined();
    expect(endState["todolistId1"][0].title).toBe("juice");
    expect(endState["todolistId1"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('correct task should change its name', () => {

    const action = changeTaskTitleAC("2", "todolistId2", "juice");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("juice");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new property array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: "123421",
        title: 'new todolist',
        addedDate: '',
        order: 0
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState['todolistId1'], 'todolistId1');
    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);

})



