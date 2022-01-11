import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        status: 'loading',
        error: null
    }
})

test('correct error message should be set', () => {
    const action = setAppErrorAC('Error')
    const endAppState = appReducer(startState, action)

    expect(endAppState.error).toBe('Error');
});
test('correct status should be set', () => {
    const action = setAppStatusAC('idle');
    const endState = appReducer(startState, action)

    expect(endState.status).toStrictEqual('idle');

});
