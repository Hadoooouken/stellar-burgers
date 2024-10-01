import ingredientsReducer, { getIngredients } from './IngredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
  it('should set loading to true on pending', () => {
    const initialState = { ingredients: [], loading: false, error: undefined };
    const action = { type: getIngredients.pending.type };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeUndefined(); // Используем undefined для ошибок
  });

  it('should set ingredients and loading to false on fulfilled', () => {
    const initialState = { ingredients: [], loading: true, error: undefined };
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'ingredient',
        type: 'main',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 100,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredients
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]._id).toBe('1');
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('should set error and loading to false on rejected', () => {
    const initialState = { ingredients: [], loading: true, error: undefined };
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error message' }
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Error message');
  });
});
