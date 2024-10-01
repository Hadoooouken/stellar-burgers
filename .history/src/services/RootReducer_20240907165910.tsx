import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  ingredients: any;
}

const initialState: CounterState = {
  ingredients: []
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {}
});

export const getIngredients = createAsyncThunk('ingredients', async () =>
  getIngredientsApi()
);

// Action creators are generated for each case reducer function
export const {} = counterSlice.actions;

export default counterSlice.reducer;
