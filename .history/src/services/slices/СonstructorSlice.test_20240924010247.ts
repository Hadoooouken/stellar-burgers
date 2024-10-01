import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './ConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  it('add ingredient', () => {
    const initialState: { bun: null; ingredients: TConstructorIngredient[] } = {
      bun: null,
      ingredients: []
    };

    const action: { type: string; payload: TConstructorIngredient } =
      addIngredient({
        _id: 'test-id',
        name: 'test-ingredient',
        type: 'main',
        price: 100,
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        image: '',
        image_large: '',
        image_mobile: ''
      } as TConstructorIngredient);

    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0].id).toBeDefined();
  });

  it('remove ingredient by id', () => {
    const ingredients1: TConstructorIngredient = {
      id: 'test-id',
      _id: 'test-id',
      name: 'test-ingredient',
      type: 'main',
      price: 100,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const initialState: { bun: null; ingredients: TConstructorIngredient[] } = {
      bun: null,
      ingredients: [ingredients1]
    };

    const action: { type: string; payload: { id: string } } = removeIngredient({
      id: 'test-id'
    });
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(0);
  });

  it('move ingredient up', () => {
    const ingredients1: TConstructorIngredient = {
      id: '1',
      _id: '1',
      name: 'ing1',
      type: 'main',
      price: 100,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const ingredients2: TConstructorIngredient = {
      id: '2',
      _id: '2',
      name: 'ing2',
      type: 'main',
      price: 100,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const initialState: { bun: null; ingredients: TConstructorIngredient[] } = {
      bun: null,
      ingredients: [ingredients1, ingredients2]
    };

    const action: { type: string; payload: number } = moveIngredientUp(1);
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
  });

  it('move ingredient down', () => {
    const ingredients1: TConstructorIngredient = {
      id: '1',
      _id: '1',
      name: 'ingredient1',
      type: 'main',
      price: 100,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const ingredients2: TConstructorIngredient = {
      id: '2',
      _id: '2',
      name: 'ing2',
      type: 'main',
      price: 100,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const initialState: { bun: null; ingredients: TConstructorIngredient[] } = {
      bun: null,
      ingredients: [ingredients1, ingredients2]
    };

    const action: { type: string; payload: number } = moveIngredientDown(0);
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });
});
