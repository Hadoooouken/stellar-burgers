import { combineReducers } from '@reduxjs/toolkit';
import constructorSlice from '../services/slices/ConstructorSlice';
import feedSlice from '../services/slices/FeedSlice';
import ingredientsSlice from '../services/slices/IngredientsSlice';
import orderSlice from '../services/slices/OrderSlice';
import userSlice from '../services/slices/UserSlice';

const rootReducer = combineReducers({
  constructor: constructorSlice,
  feed: feedSlice,
  ingredients: ingredientsSlice,
  order: orderSlice,
  user: userReducer,
});

export default rootReducer;
