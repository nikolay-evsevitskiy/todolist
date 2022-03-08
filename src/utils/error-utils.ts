import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    data.messages.length ? dispatch(setAppErrorAC({error: data.messages[0]})) :
        dispatch(setAppErrorAC({error: 'Some error occurred!'}));
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkAppError = (message: string, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: message ? message : 'Some error occurred?'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}
