import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    data.messages.length
        ? dispatch(setAppErrorAC({error: data.messages[0]}))
        : dispatch(setAppErrorAC({error: 'Some error occurred!'}));
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkAppError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred?'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}
