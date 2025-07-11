import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { todoReducer } from './todoReducer';
import { loaderReducer } from './loaderReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
    todos: todoReducer,
    loader: loaderReducer
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
