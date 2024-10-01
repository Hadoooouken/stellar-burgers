import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} from './ConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  const createIngredient = (id: string): TConstructorIngredient => ({
    id,
    _id: id,
    name: `ingredient-${id}`,
    type: 'main',
    price: 100,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    image: '',
    image_large: '',
    image_mobile: ''
  });

  const createInitialState = (
    ingredients: TConstructorIngredient[] = []
  ): { bun: null; ingredients: TConstructorIngredient[] } => ({
    bun: null,
    ingredients
  });

  it('should return the initial state', () => {
    const newState = constructorReducer(undefined, { type: '' });
    expect(newState).toEqual(createInitialState());
  });

  it('add ingredient', () => {
    const initialState = createInitialState();
    const action = addIngredient(createIngredient('test-id'));

    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0].id).toBeDefined(); // Проверка на наличие id
    expect(newState.ingredients[0].id).not.toBe(''); // Проверка что id не пустой
    expect(newState.ingredients[0]._id).toBe('test-id'); // Проверка что _id совпадает
    expect(newState.ingredients[0].id).not.toBe('test-id'); // Проверка, что id не совпадает с переданным
  });

  it('remove ingredient by id', () => {
    const ingredient = createIngredient('test-id');
    const initialState = createInitialState([ingredient]);
    const action = removeIngredient({ id: 'test-id' });
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(0);
  });

  it('move ingredient up', () => {
    const ingredients = [createIngredient('1'), createIngredient('2')];
    const initialState = createInitialState(ingredients);
    const action = moveIngredientUp(1);
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
  });

  it('move ingredient down', () => {
    const ingredients = [createIngredient('1'), createIngredient('2')];
    const initialState = createInitialState(ingredients);
    const action = moveIngredientDown(0);
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });

  it('should reset the constructor', () => {
    const ingredients = [createIngredient('1'), createIngredient('2')];
    const initialState = createInitialState(ingredients);
    const action = resetConstructor();
    const newState = constructorReducer(initialState, action);

    expect(newState.bun).toBeNull();
    expect(newState.ingredients.length).toBe(0);
  });
});
