import React from "react";
import {Provider} from "react-redux";
import {store} from "../../state/store";

export const AppWithReduxProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}