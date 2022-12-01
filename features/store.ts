import {configureStore} from '@reduxjs/toolkit';
import bankAccountsListSlice from './reducers';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    bankAccountsList: bankAccountsListSlice.reducer
    // other reducers like user, auth, or POST req to backend server to store data
})
//store
export const store = configureStore({
    reducer: rootReducer
})

// Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;    
