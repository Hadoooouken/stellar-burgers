// import rootReducer from './slices/IngredientsSlice';
// import constructorReducer from './slices/ConstructorSlice';
// import FeedSlice from './slices/FeedSlice';
// import orderSlice from './slices/OrderSlice';

// import { configureStore } from '@reduxjs/toolkit';

// import {
//   TypedUseSelectorHook,
//   useDispatch as dispatchHook,
//   useSelector as selectorHook
// } from 'react-redux';
// import UserSlice from './slices/UserSlice';

// const store = configureStore({
//   reducer: {
//     root: rootReducer,
//     constructorData: constructorReducer,
//     feed: FeedSlice,
//     user: UserSlice,
//     order: orderSlice
//   },
//   devTools: process.env.NODE_ENV !== 'production'
// });

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

// export const useDispatch: () => AppDispatch = () => dispatchHook();
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

import rootReducer from '../services/RootReducer'; // Убедитесь, что путь правильный
import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
