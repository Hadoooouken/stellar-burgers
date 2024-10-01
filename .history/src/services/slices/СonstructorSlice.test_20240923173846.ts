import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './ConstructorSlice';
import { TConstructorIngredient } from '@utils-types'; // Импортируйте правильный тип

describe('constructorSlice reducer', () => {
  it('should add ingredient', () => {
    const initialState = { bun: null, ingredients: [] };
    const action = addIngredient({
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
    } as TConstructorIngredient); // Убедитесь, что используете правильный тип

    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0].id).toBe('test-id');
  });

  it('should remove ingredient by id', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
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
        } as TConstructorIngredient
      ] // Убедитесь, что используете правильный тип
    };
    const action = removeIngredient({ id: 'test-id' });
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(0);
  });

  it('should move ingredient up', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
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
        } as TConstructorIngredient,
        {
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
        } as TConstructorIngredient
      ]
    };
    const action = moveIngredientUp(1);
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
  });

  it('should move ingredient down', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
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
        } as TConstructorIngredient,
        {
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
        } as TConstructorIngredient
      ]
    };
    const action = moveIngredientDown(0);
    const newState = constructorReducer(initialState, action);
    expect(newState.ingredients[0].id).toBe('test-id');

    expect(newState.ingredients[0].id).toBeTruthy(); // если ID генерируется

  });
});
