import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  ingredients: any;
  loading: 
}

const initialState: CounterState = {
  ingredients: [],
  loading: false,
  error: false
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
          .addCase(getBooks.pending, (state) => {
        state.loading = true;
      state.error = null;
          })
    .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
      state.error = action.error.message;
    })
    .addCase(getBooks.fulfilled, (state, action) => {
              state.loading = false;
      state.books = action.payload;    
    }
}
});

export const getIngredients = createAsyncThunk('ingredients', async () =>
  getIngredientsApi()
);

// Action creators are generated for each case reducer function
export const {} = counterSlice.actions;

export default counterSlice.reducer;
