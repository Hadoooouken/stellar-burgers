import rootReducer from './RootReducer'; // Убедитесь, что путь правильный
import { IConstructorState } from './slices/ConstructorSlice'; // Импортируйте интерфейсы
import { IIngredientsState } from './slices/IngredientsSlice';

describe('rootReducer', () => {
  it('should return initial state when called with undefined state and unknown action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      constructorData: { bun: null, ingredients: [] },
      feed: {}, // начальное состояние для feedSlice
      ingredients: { ingredients: [], loading: false, error: '' },
      order: {}, // начальное состояние для orderSlice
      user: {} // начальное состояние для userSlice
    });
  });
});
