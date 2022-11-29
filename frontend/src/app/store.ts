import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import bankAccountsListSlice from '../features/bankAccountsList/bankAccountsListSlice';

const rootReducer = combineReducers({
  bankAccountsList: bankAccountsListSlice.reducer
  // other reducers like user, auth, or POST req to backend server to store data
})

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
