import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { requestFail, requestPending, requestSuccess } from './request';
import { ApiCallParams } from 'types/apiCall';

const defaultHeaders = () => {
	axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
	const headers = {
		'Accept': '*/*',
		'Content-Type': 'application/json'
	};

	return headers;
};

axios.defaults.timeout = 10000

const getErrorMessage = (error: any): string => {
	if (!error.response) {
		return 'Network error. Please check your connection and try again.';
	}

	return error.response?.data?.error || 'An unexpected error occurred.';
};

const getErrorField = (error: any): Record<string, string[]> => {
	if (!error.response?.data?.error) {
		return {
			_error: [getErrorMessage(error)]
		};
	}

	return error.response.data.error;
};

export default ({
	type,
	method,
	path,
	headers,
	success,
	fail,
	payloadOnSuccess,
	payloadOnFail
}: ApiCallParams) =>
	function* (action: any): Generator<any, void, AxiosResponse<any>> {
		const {
			body,
			params,
			success: successCallback,
			fail: failCallback
		} = action.payload || {};
		
		try {
			yield put({
				type: requestPending(type),
			});

			const res = yield call(axios.request, {
				url: typeof path === 'function' ? path(action) : path,
				method: method.toLowerCase(),
				headers: Object.assign({}, defaultHeaders(), headers),
				data: body,
				params
			});

			success && success(res, action);
			successCallback && successCallback(res);

			yield put({
				type: requestSuccess(type),
				payload: payloadOnSuccess
					? payloadOnSuccess(res.data, action)
					: res.data
			});
		} catch (err: any) {
			const errorMessage = getErrorMessage(err);
			const errorField = getErrorField(err);
			const errorResponse = {
				message: errorMessage,
				errors: errorField
			};

			fail && fail(errorResponse);
			failCallback && failCallback(errorResponse);

			yield put({
				type: requestFail(type),
				payload: payloadOnFail ? payloadOnFail(errorResponse, action) : errorResponse,
			});
		}
	};
