import ingredientsReducer, { getIngredients } from './IngredientsSlice';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
ф
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ingredientsSlice reducer', () => {
  it('should set loading to true on pending', () => {
    const initialState = { ingredients: [], loading: false, error: '' };
    const action = getIngredients.pending.type;
    const newState = ingredientsReducer(initialState, { type: action });

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe('');
  });

  it('should set ingredients and loading to false on fulfilled', () => {
    const initialState = { ingredients: [], loading: true, error: '' };
    const action = getIngredients.fulfilled([{ _id: '1', name: 'ingredient', type: 'main', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 100, image: '', image_large: '', image_mobile: '' }], '');
    const newState = ingredientsReducer(initialState, action);

    expect(newState.ingredients.length).toBe(1);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('');
  });

  it('should set error and loading to false on rejected', () => {
    const initialState = { ingredients: [], loading: true, error: '' };
    const action = getIngredients.rejected(new Error('Error message'), '', undefined, '');
    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Error message');
  });
});
