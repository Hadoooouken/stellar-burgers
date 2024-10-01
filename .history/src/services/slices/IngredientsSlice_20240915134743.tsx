// import { getIngredientsApi } from '@api';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import { TIngredient } from '@utils-types';

// export interface IIngredientsState {
//   ingredients: TIngredient[];
//   loading: boolean;
//   error?: string;
// }

// const initialState: IIngredientsState = {
//   ingredients: [],
//   loading: false,
//   error: ''
// };

// export const ingredientsSlice = createSlice({
//   name: 'ingridient',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getIngredients.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(getIngredients.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(getIngredients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ingredients = action.payload;
//       });
//   }
// });

// export const getIngredients = createAsyncThunk<TIngredient[]>(
//   'ingredients',
//   async () => getIngredientsApi()
// );

// // Action creators are generated for each case reducer function
// export const {} = ingredientsSlice.actions;

// export default ingredientsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

// Тип состояния для ингредиентов
export interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | undefined;
}

// Начальное состояние
const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: undefined
};

// Асинхронный thunk для получения ингредиентов
export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async () => await getIngredientsApi()
);

// Создание слайса для ингредиентов
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Селекторы для выборки данных из состояния
export const selectIngredients = (state: IIngredientsState) =>
  state.ingredients;
export const selectIngredientsLoader = (state: IIngredientsState) =>
  state.loading;
export const selectBuns = (state: IIngredientsState) =>
  state.ingredients.filter((item) => item.type === 'bun');
export const selectMains = (state: IIngredientsState) =>
  state.ingredients.filter((item) => item.type === 'main');
export const selectSauces = (state: IIngredientsState) =>
  state.ingredients.filter((item) => item.type === 'sauce');

// Экспорт редюсера
export default ingredientsSlice.reducer;
