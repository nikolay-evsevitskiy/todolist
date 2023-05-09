import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";
import {tasksReducer, todolistsReducer} from "../features/todolistsList";
import {authReducer} from "../features/Auth/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,

// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject>(action: T) {
    const dispatch = useAppDispatch()
    return useMemo(() => {
        return bindActionCreators(action, dispatch)
    }, [action, dispatch])
}

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
//@ts-ignore
window.store = store;

