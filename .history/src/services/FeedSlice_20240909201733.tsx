import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IFeedState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: IFeedState = {
  bun: null,
  ingredients: []
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  addBun,
} = feedSlice.actions;

export default feedSlice.reducer;
