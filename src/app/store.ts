import {tasksReducer} from '../features/todolistsList/todolist/task/tasks-reducer';
import {todolistsReducer} from '../features/todolistsList/todolist/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../features/login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
//@ts-ignore
window.store = store;

