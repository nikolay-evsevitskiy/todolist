import {addTaskTC, fetchTaskTC, removeTaskTC, tasksReducer, updateTaskTC} from './tasks-reducer';
import {TaskStateType} from '../../../../trash/App';
import {addTodolistTC, removeTodolistTC} from '../todolists-reducer';
import {TaskStatuses, TodoTaskPriorities} from "../../../../api/todolists-api";
import {RequestStatusType} from "../../../../app/app-reducer";

let startState: TaskStateType = {};

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle'
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle'
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle'
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle'
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle'
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle',
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskTC.fulfilled({todolistId: "todolistId2", taskID: "2"}, 'requestId', {
        taskId: "2",
        todolistId: "todolistId2"
    });

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle',
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle',
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle',
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle',
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                description: '',
                entityTaskStatus: 'idle',
            }
        ]
    });

});

test('correct  task should be added to correct array', () => {
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
        description: '',
        entityTaskStatus: 'idle' as RequestStatusType,

    }

    const action = addTaskTC.fulfilled(newTask, 'requestId', {title: newTask.title, todolistId: newTask.todoListId});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][0].id).toBeDefined();
    expect(endState["todolistId1"][0].title).toBe("juice");
    expect(endState["todolistId1"][0].status).toBe(TaskStatuses.New);
})

test('status  of specified task should be changed', () => {

    let updateModel = {taskId: "2", todolistId: "todolistId2", domainModel: {status: TaskStatuses.New}};
    const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    let updateModel = {taskId: "2", todolistId: "todolistId2", domainModel: {title: 'Hello World'}};
    const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Hello World");
    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"].length).toBe(3);
});

test('new property array should be added when new todolist is added', () => {

    const param = {
        todolist: {
            id: "123421",
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    };
    const action = addTodolistTC.fulfilled(param, 'requestId', {title: param.todolist.title});

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

    const params = {todolistId: "todolistId2"};
    const action = removeTodolistTC.fulfilled(params, 'requestId', params);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test('tasks should be added for todolist', () => {

    const action = fetchTaskTC.fulfilled({
        tasks: startState['todolistId1'],
        todolistId: 'todolistId1'
    }, 'requestId', 'todolistId1');
    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);

})



