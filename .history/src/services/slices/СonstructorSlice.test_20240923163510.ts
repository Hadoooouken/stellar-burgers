import constructorReducer, { addIngredient, removeIngredient, moveIngredientUp, moveIngredientDown } from './ConstructorSlice';

describe('constructorSlice reducer', () => {
  it('should add ingredient', () => {
    const initialState = { bun: null, ingredients: [] };
    const action = addIngredient({ id: 'test-id', name: 'test-ingredient', type: 'main', price: 100 });
    const newState = constructorReducer(initialState, action);
    
    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0].id).toBe('test-id');
  });

  it('should remove ingredient by id', () => {
    const initialState = { bun: null, ingredients: [{ id: 'test-id', name: 'test-ingredient' }] };
    const action = removeIngredient({ id: 'test-id' });
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(0);
  });

  it('should move ingredient up', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { id: '1', name: 'ing1' },
        { id: '2', name: 'ing2' },
      ],
    };
    const action = moveIngredientUp(1);
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
  });
});
