import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from '../services/slices/ConstructorSlice';
import feedSlice from '../services/slices/FeedSlice';
import ingredientsReducer from '../services/slices/ConstructorSlice';
import orderSlice from '../services/slices/OrderSlice';
import userReducer from './UserSlice';

const rootReducer = combineReducers({
  constructor: constructorReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
});

export default rootReducer;
