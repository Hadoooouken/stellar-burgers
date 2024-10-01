import rootReducer from '../services/RootReducer';

describe('rootReducer', () => {
  it('should return initial state when called with undefined state and unknown action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      constructorData: { bun: null, ingredients: [] },
      feed: {}, // ожидаемое начальное состояние feedSlice
      ingredients: { ingredients: [], loading: false, error: '' },
      order: {}, // ожидаемое начальное состояние orderSlice
      user: {} // ожидаемое начальное состояние userSlice
    });
  });
});
