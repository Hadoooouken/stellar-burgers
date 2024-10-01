import constructorReducer, { 
    addIngredient, 
    removeIngredient, 
    moveIngredientUp, 
    moveIngredientDown 
  } from './ConstructorSlice';
  import { TConstructorIngredient } from '@utils-types'; // Убедитесь, что путь правильный
  
  describe('constructorSlice reducer', () => {
    it('should add ingredient', () => {
      const initialState = { bun: null, ingredients: [] };
      const action = addIngredient({
        id: 'test-id',
        name: 'test-ingredient',
        _id: 'test-id', // Все необходимые поля
        type: 'main',
        price: 100,
        proteins: 0,
        fat: 0,
        calories: 0,
      });
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
            name: 'test-ingredient',
            _id: 'test-id',
            type: 'main',
            price: 100,
            proteins: 0,
            fat: 0,
            calories: 0,
          },
        ],
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
            name: 'ing1',
            _id: '1',
            type: 'main',
            price: 100,
            proteins: 0,
            fat: 0,
            calories: 0,
          },
          {
            id: '2',
            name: 'ing2',
            _id: '2',
            type: 'main',
            price: 100,
            proteins: 0,
            fat: 0,
            calories: 0,
          },
        ],
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
            name: 'ing1',
            _id: '1',
            type: 'main',
            price: 100,
            proteins: 0,
            fat: 0,
            calories: 0,
          },
          {
            id: '2',
            name: 'ing2',
            _id: '2',
            type: 'main',
            price: 100,
            proteins: 0,
            fat: 0,
            calories: 0,
          },
        ],
      };
      const action = moveIngredientDown(0);
      const newState = constructorReducer(initialState, action);
  
      expect(newState.ingredients[1].id).toBe('1');
    });
  });
  