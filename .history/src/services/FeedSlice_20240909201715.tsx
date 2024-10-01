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
    addIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    removeIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    moveIngredientUp: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredient);
      }
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredient);
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = feedSlice.actions;

export default feedSlice.reducer;
