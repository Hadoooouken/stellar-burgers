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
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  reducers: {
    addBun: (state, action) => {
      console.log(action);
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      console.log(action);
      state.ingredients = [...state.ingredients, action.payload];
    }
  }
});

// Action creators are generated for each case reducer function
export const { addBun, addIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;
