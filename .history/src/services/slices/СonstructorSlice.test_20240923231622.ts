import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './ConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

const createIngredient = (overrides: Partial<TConstructorIngredient>): TConstructorIngredient => ({
  _id: 'default-id',
  name: 'default-name',
  type: 'main',
  price: 100,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  image: '',
  image_large: '',
  image_mobile: '',
 
});

describe('constructorSlice reducer', () => {
  it('add ingredient', () => {
    const initialState = { bun: null, ingredients: [] };
    const action = addIngredient(createIngredient({
      _id: 'test-id',
      name: 'test-ingredient',
    }));

    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]._id).toBe('test-id');
  });

  it('remove ingredient by id', () => {
    const initialState = {
      bun: null,
      ingredients: [
        createIngredient({
          _id: 'test-id',
          name: 'test-ingredient',
        })
      ]
    };
    const action = removeIngredient({ id: 'test-id' });
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(0);
  });

  it('move ingredient up', () => {
    const initialState = {
      bun: null,
      ingredients: [
        createIngredient({ id: '1', name: 'ing1' }),
        createIngredient({ id: '2', name: 'ing2' })
      ]
    };
    const action = moveIngredientUp(1);
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
  });

  it('move ingredient down', () => {
    const initialState = {
      bun: null,
      ingredients: [
        createIngredient({ id: '1', name: 'ing1' }),
        createIngredient({ id: '2', name: 'ing2' })
      ]
    };
    const action = moveIngredientDown(0);
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });
});
