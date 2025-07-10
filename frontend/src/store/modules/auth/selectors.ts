import { get } from 'lodash';

export const authUserSelector = (state: any) => get(state, 'auth');

export const authStatusSelector = (state: any) => get(state, 'auth.status') === 'SUCCESS';

export const authLoadingSelector = (state: any) => get(state, 'auth.status') === 'PENDING';
