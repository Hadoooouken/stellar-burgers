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
  },
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

export const getFeed = createAsyncThunk<TIngredient[]>(
  'ingredients',
  async () => getF()
);

// Action creators are generated for each case reducer function
export const {
  addBun,
} = feedSlice.actions;

export default feedSlice.reducer;
