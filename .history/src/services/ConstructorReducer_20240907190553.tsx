import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IConstructorState {
  bun: T;
  ingredients: TIngredient[];
}

const initialState: IConstructorState = {
  ingredients: [],
  loading: false,
  error: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients',
  async () => getIngredientsApi()
);

// Action creators are generated for each case reducer function
export const {} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
