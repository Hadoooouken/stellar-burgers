import ingredientsReducer, { getIngredients } from './IngredientsSlice';
import { TIngredient } from '@utils-types';

const initialState = {
  ingredients: [] as TIngredient[],
  loading: false,
  error: ''
};

describe('ingredientsSlice reducer', () => {
  it('should return the initial state', () => {
    const newState = ingredientsReducer(undefined, { type: '' });
    expect(newState).toEqual(initialState);
  });

  it('should set loading to true on pending', () => {
    const action = { type: getIngredients.pending.type };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(''); // Проверяем на пустую строку
  });

  it('should set ingredients and loading to false on fulfilled', () => {
    const mockIngredients = [
      { _id: 'test-id', name: 'test-ingredient', type: 'main', price: 100 }
    ] as TIngredient[];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.error).toBe(''); 
  });

  it('should set error and loading to false on rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error occurred' }
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Error occurred');
  });
});
