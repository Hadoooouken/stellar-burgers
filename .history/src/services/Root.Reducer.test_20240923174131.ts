import rootReducer from './RootReducer'; // Убедитесь, что путь правильный
import { IConstructorState } from './slices/ConstructorSlice'; // Импортируйте интерфейсы
import { IIngredientsState } from './slices/IngredientsSlice';

describe('rootReducer', () => {
  it('should return initial state when called with undefined state and unknown action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      constructorData: { bun: null, ingredients: [] },
      feed: { error: '', loading: false, orders: [], total: 0, totalToday: 0 },
      ingredients: { ingredients: [], loading: false, error: '' },
      order: { order: null, orderFailed: false, orderRequest: false, ordersHistory: null, ordersHistoryFailed: false, ordersHistoryRequest: false },
      user: { error: '', isAuthorized: false, loading: false, user: null },
    });
    
  });
});

