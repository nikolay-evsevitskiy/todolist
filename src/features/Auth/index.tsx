import * as authSelectors from './selectors'
import {Login} from './Login'
import * as authAsyncActions from "./auth-actions";
import {slice} from './auth-reducer'

const authActions = {
    ...slice.actions,
    ...authAsyncActions
}

export {authSelectors, Login, authActions}
