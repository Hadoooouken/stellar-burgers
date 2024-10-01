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
  name: 'ingredients',
  initialState,
  reducers: {
    addBun: (state, action) => {
      console.log()
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    }
  }
});

// Action creators are generated for each case reducer function
export const { addBun, addIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;
