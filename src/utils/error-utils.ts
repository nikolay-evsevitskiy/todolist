import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>) => {
    data.messages.length ? dispatch(setAppErrorAC(data.messages[0])) :
        dispatch(setAppErrorAC('Some error occurred!'));
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkAppError = (message: string, dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppErrorAC(message ? message : 'Some error occurred?'))
    dispatch(setAppStatusAC('failed'))
}