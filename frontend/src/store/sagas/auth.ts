import { takeLatest } from "redux-saga/effects";
import * as CONSTANTS from '../modules/auth/constants';
import apiCall from "store/api/apiCall";
import { Action } from "redux-actions";

const signup = apiCall({
    type: CONSTANTS.SIGNUP,
    method: 'post',
    path: '/signup'
});

export default function* rootSaga() {
    yield takeLatest(CONSTANTS.SIGNUP, function* (action: Action<any>) {
        yield signup({ payload: action.payload });
    });
}
