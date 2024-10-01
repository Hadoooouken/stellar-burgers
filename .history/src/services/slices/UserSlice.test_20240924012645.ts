import userReducer, {
  loginUser,
  getUser,
  registerUser,
  updateUser,
  logoutUser
} from './UserSlice';

describe('User Slice', () => {
  const initialState = {
    user: null,
    isAuthorized: false,
    loading: false,
    error: ''
  };

  it('should return the initial state', () => {
    const state = userReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('handle loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('handle loginUser fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' }; 
    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      loading: false
    });
  });

  it('handle loginUser rejected', () => {
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

  it('handle getUser pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('handle getUser fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' };
    const action = { type: getUser.fulfilled.type, payload: { user } };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      loading: false
    });
  });

  it('handle getUser rejected', () => {
    const action = {
      type: getUser.rejected.type,
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

  it('handle registerUser pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('handle registerUser fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' };
    const action = { type: registerUser.fulfilled.type, payload: { user } };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      loading: false
    });
  });

  it('handle registerUser rejected', () => {
    const action = {
      type: registerUser.rejected.type,
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

  it('handle updateUser pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('handle updateUser fulfilled', () => {
    const updatedUser = { id: 'user123', email: 'updated@test.com' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: updatedUser,
      loading: false
    });
  });

  it('handle updateUser rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      loading: false
    });
  });

  it('handle logoutUser pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('handle logoutUser fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(
      { ...initialState, user: { id: 'user123', email: 'test@test.com' }, isAuthorized: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      user: null,
      isAuthorized: false,
      loading: false
    });
  });

  it('handle logoutUser rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      loading: false
    });
  });
});
