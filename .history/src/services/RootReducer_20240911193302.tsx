import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './ConstructorSlice';
import feedSlice from './FeedSlice';
import ingredientsReducer from './IngredientsSlice';
import orderReducer from './OrderSlice';
import userReducer from './UserSlice';

const rootReducer = combineReducers({
  constructor: constructorReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
});

export default rootReducer;
