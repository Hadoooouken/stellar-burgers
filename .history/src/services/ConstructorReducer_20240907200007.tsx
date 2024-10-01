import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => {
          let customBreak = false;
          return  item._id !== action.payload._id
        }
      );
    }
  }
});

// Action creators are generated for each case reducer function
export const { addBun, addIngredient, removeIngredient } =
  constructorSlice.actions;

export default constructorSlice.reducer;
