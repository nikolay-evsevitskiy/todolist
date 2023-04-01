import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        status: 'loading',
        error: null,
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const action = setAppErrorAC({error: 'Error'})
    const endAppState = appReducer(startState, action)

    expect(endAppState.error).toBe('Error');
});
test('correct status should be set', () => {
    const action = setAppStatusAC({status: 'idle'});
    const endState = appReducer(startState, action)

    expect(endState.status).toStrictEqual('idle');

});
