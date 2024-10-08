import rootReducer from './RootReducer';
import constructorReducer from './ConstructorSlice';
import FeedSlice from './FeedSlice';
import or

import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import UserSlice from './UserSlice';

const store = configureStore({
  reducer: {
    root: rootReducer,
    constructorData: constructorReducer,
    feed: FeedSlice,
    user: UserSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
