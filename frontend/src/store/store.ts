import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory as createHistory } from 'history';
import rootReducer from './reducers';
import sagas from './sagas';

export const history = createHistory();

const initialState = {};
const enhancers: StoreEnhancer[] = [];

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENTION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers) as StoreEnhancer;

const store = createStore(rootReducer, initialState, composedEnhancers);

sagaMiddleware.run(sagas);

export default store;
