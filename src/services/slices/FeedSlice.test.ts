import feedReducer, { getFeeds, initialState } from './FeedSlice';

describe('Feed Slice', () => {
  it('handle getFeeds pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('handle getFeeds fulfilled', () => {
    const feeds = { orders: [{ id: 'order1' }], total: 100, totalToday: 10 };
    const action = { type: getFeeds.fulfilled.type, payload: feeds };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: feeds.orders,
      total: feeds.total,
      totalToday: feeds.totalToday,
      loading: false
    });
  });

  it('handle getFeeds rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Error'
    });
  });
});
