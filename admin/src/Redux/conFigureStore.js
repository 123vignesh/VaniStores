import { createStore, combineReducers, applyMiddleware } from 'redux';


import { Auth } from './Auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({

            auth: Auth,

        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}