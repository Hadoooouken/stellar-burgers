import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    Ingredients: any;
}

const initialState: CounterState = {
    Ingredients: []
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  }
});

export const getBooks = createAsyncThunk('books/getAll', async () =>
  getIngredientsApi()
);

// Action creators are generated for each case reducer function
export const { } = counterSlice.actions;

export default counterSlice.reducer;
