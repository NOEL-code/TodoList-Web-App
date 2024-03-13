import { combineReducers } from 'redux';
import todoReducer from './reducer/todo';
import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import myMid from './middlewares/myMiddlewares';

const rootReducer = combineReducers({
  todo: todoReducer,
});

myMiddlewares = [logger, myMid];

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware().concat(myMiddlewares);
    console.log(middleware);
    return middleware;
  },
});
