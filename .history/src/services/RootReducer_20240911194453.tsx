import { combineReducers } from '@reduxjs/toolkit';
import constructorSlice from '../services/slices/ConstructorSlice';
import initialState from '../services/slices/FeedSlice';
import ingredientsSlice from '../services/slices/IngredientsSlice';
import orderSlice from '../services/slices/OrderSlice';
import userSlice from '../services/slices/UserSlice';

const rootReducer = combineReducers({
  constructor: constructorSlice,
  feed: initialState,
  ingredients: ingredientsSlice,
  order: orderSlice,
  user: userSlice
});

export default rootReducer;
