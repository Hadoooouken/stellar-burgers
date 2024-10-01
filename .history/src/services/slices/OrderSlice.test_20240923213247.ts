import orderReducer, { createOrder, fetchUserOrders } from './OrderSlice';
import { resetConstructor } from './ConstructorSlice';

describe('Order Slice', () => {
  const initialState = {
    order: null,
    ordersHistory: null,
    orderRequest: false,
    orderFailed: false,
    ordersHistoryRequest: false,
    ordersHistoryFailed: false,
  };

  it('should handle createOrder pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it('should handle createOrder fulfilled', () => {
    const order = { id: '123', ingredients: [] }; // mock data
    const action = { type: createOrder.fulfilled.type, payload: order };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order,
      orderRequest: false,
    });
  });

  it('should handle createOrder rejected', () => {
    const action = { type: createOrder.rejected.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true,
    });
  });

  it('should handle fetchUserOrders fulfilled', () => {
    const ordersHistory = [{ id: 'order1' }, { id: 'order2' }];
    const action = { type: fetchUserOrders.fulfilled.type, payload: ordersHistory };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ordersHistory,
      ordersHistoryRequest: false,
    });
  });
});
