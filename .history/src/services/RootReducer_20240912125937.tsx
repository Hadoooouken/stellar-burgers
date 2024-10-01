import { combineReducers } from '@reduxjs/toolkit';
import constructorSlice from '../services/slices/ConstructorSlice';
import feedSlice from '../services/slices/FeedSlice';
import ingredientsSlice from '../services/slices/IngredientsSlice';
import orderSlice from './slices/abcd';
import userSlice from '../services/slices/UserSlice';

const rootReducer = combineReducers({
  constructorData: constructorSlice,
  feed: feedSlice,
  ingredients: ingredientsSlice,
  order: orderSlice,
  user: userSlice
});

export default rootReducer;
