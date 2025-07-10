import { handleActions } from "redux-actions";
import * as CONSTANTS from './constants';
import { requestFail, requestSuccess } from "store/api/request";

const getInitialState = () => {
  return {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    status: '',
    error: null
  };
};

export default handleActions(
  {
    [CONSTANTS.SIGNUP]: (state: any) => {
      localStorage.setItem('isAuthenticated', 'false');
      return {
        ...state,
        status: 'PENDING'
      };
    },
    [requestSuccess(CONSTANTS.SIGNUP)]: (state: any, { payload }: any) => {
      localStorage.setItem('isAuthenticated', 'true');
      return {
        ...state,
        first_name: payload?.user?.first_name,
        last_name: payload?.user?.last_name,
        email: payload?.user?.email,
        username: payload?.user?.username,
        status: 'SUCCESS'
      };
    },
    [requestFail(CONSTANTS.SIGNUP)]: (state: any, { payload }: any) => {
      localStorage.setItem('isAuthenticated', 'false');
      return {
        ...state,
        status: 'FAILED',
        error: payload?.errors,
      };
    }
  },
  getInitialState()
)