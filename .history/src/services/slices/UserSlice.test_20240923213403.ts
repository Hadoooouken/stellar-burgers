import userReducer, { loginUser } from './UserSlice';

describe('User Slice', () => {
  const initialState = {
    user: null,
    isAuthorized: false,
    loading: false,
    error: ''
  };

  it('should handle loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should handle loginUser fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' }; // mock user
    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      loading: false
    });
  });

  it('should handle loginUser rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isAuthorized: false,
      loading: false
    });
  });
});
