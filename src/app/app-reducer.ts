const initialState: InitialStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'APP/SET-STATUS' :
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type ActionTypes = SetAppStatusActionType
    | SetAppErrorActionType
