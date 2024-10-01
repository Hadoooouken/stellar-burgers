// import constructorReducer, {
//   addIngredient,
//   removeIngredient,
//   moveIngredientUp,
//   moveIngredientDown
// } from './ConstructorSlice';
// import { TConstructorIngredient } from '@utils-types';

// describe('constructorSlice reducer', () => {
//   it('add ingredient', () => {
//     const initialState = { bun: null, ingredients: [] };
//     const action = addIngredient({
//       _id: 'test-id',
//       name: 'test-ingredient',
//       type: 'main',
//       price: 100,
//       proteins: 0,
//       fat: 0,
//       carbohydrates: 0,
//       calories: 0,
//       image: '',
//       image_large: '',
//       image_mobile: ''
//     } as TConstructorIngredient);

//     const newState = constructorReducer(initialState, action);

//     expect(newState.ingredients.length).toBe(1);
//     expect(newState.ingredients[0].id).toBeDefined();
//   });

//   it('remove ingredient by id', () => {
//     const initialState = {
//       bun: null,
//       ingredients: [
//         {
//           id: 'test-id',
//           _id: 'test-id',
//           name: 'test-ingredient',
//           type: 'main',
//           price: 100,
//           proteins: 0,
//           fat: 0,
//           carbohydrates: 0,
//           calories: 0,
//           image: '',
//           image_large: '',
//           image_mobile: ''
//         } as TConstructorIngredient
//       ]
//     };
//     const action = removeIngredient({ id: 'test-id' });
//     const newState = constructorReducer(initialState, action);

//     expect(newState.ingredients.length).toBe(0);
//   });

//   it('move ingredint up', () => {
//     const initialState = {
//       bun: null,
//       ingredients: [
//         {
//           id: '1',
//           _id: '1',
//           name: 'ing1',
//           type: 'main',
//           price: 100,
//           proteins: 0,
//           fat: 0,
//           carbohydrates: 0,
//           calories: 0,
//           image: '',
//           image_large: '',
//           image_mobile: ''
//         } as TConstructorIngredient,
//         {
//           id: '2',
//           _id: '2',
//           name: 'ing2',
//           type: 'main',
//           price: 100,
//           proteins: 0,
//           fat: 0,
//           carbohydrates: 0,
//           calories: 0,
//           image: '',
//           image_large: '',
//           image_mobile: ''
//         } as TConstructorIngredient
//       ]
//     };
//     const action = moveIngredientUp(1);
//     const newState = constructorReducer(initialState, action);

//     expect(newState.ingredients[0].id).toBe('2');
//   });

//   it('move ingredient down', () => {
//     const initialState = {
//       bun: null,
//       ingredients: [
//         {
//           id: '1',
//           _id: '1',
//           name: 'ing1',
//           type: 'main',
//           price: 100,
//           proteins: 0,
//           fat: 0,
//           carbohydrates: 0,
//           calories: 0,
//           image: '',
//           image_large: '',
//           image_mobile: ''
//         } as TConstructorIngredient,
//         {
//           id: '2',
//           _id: '2',
//           name: 'ing2',
//           type: 'main',
//           price: 100,
//           proteins: 0,
//           fat: 0,
//           carbohydrates: 0,
//           calories: 0,
//           image: '',
//           image_large: '',
//           image_mobile: ''
//         } as TConstructorIngredient
//       ]
//     };
//     const action = moveIngredientDown(0);
//     const newState = constructorReducer(initialState, action);

//     expect(newState.ingredients[0].id).toBe('2');
//     expect(newState.ingredients[1].id).toBe('1');
//   });
// });
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
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

  it('add ingredient', () => {
    const initialState = createInitialState();
    const action = addIngredient(createIngredient('test-id'));

    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0].id).toBeDefined();
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
});
