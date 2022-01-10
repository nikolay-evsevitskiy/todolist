export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
 export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionTypes = SetAppStatusActionType


const initialState = {
    status: 'loading' as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'APP/SET-STATUS' :
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}


