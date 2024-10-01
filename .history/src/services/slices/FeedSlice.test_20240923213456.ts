import feedReducer, { getFeeds } from './FeedSlice';

describe('Feed Slice', () => {
  const initialState = {
    loading: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: '',
  };

  it('should handle getFeeds pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should handle getFeeds fulfilled', () => {
    const feeds = { orders: [{ id: 'order1' }], total: 100, totalToday: 10 }; // mock feeds
    const action = { type: getFeeds.fulfilled.type, payload: feeds };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: feeds.orders,
      total: feeds.total,
      totalToday: feeds.totalToday,
      loading: false,
    });
  });

  it('should handle getFeeds rejected', () => {
    const action = { type: getFeeds.rejected.type, error: { message: 'Error' } };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Error',
    });
  });
});
