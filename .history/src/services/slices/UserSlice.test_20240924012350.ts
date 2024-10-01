// import userReducer, { loginUser } from './UserSlice';

// describe('User Slice', () => {
//   const initialState = {
//     user: null,
//     isAuthorized: false,
//     loading: false,
//     error: ''
//   };

//   it('handle loginUser pending', () => {
//     const action = { type: loginUser.pending.type };
//     const state = userReducer(initialState, action);
//     expect(state.loading).toBe(true);
//   });

//   it('handle loginUser fulfilled', () => {
//     const user = { id: 'user123', email: 'test@test.com' };
//     const action = { type: loginUser.fulfilled.type, payload: user };
//     const state = userReducer(initialState, action);
//     expect(state).toEqual({
//       ...initialState,
//       user,
//       isAuthorized: true,
//       loading: false
//     });
//   });

//   it('handle loginUser rejected', () => {
//     const action = {
//       type: loginUser.rejected.type,
//       error: { message: 'Error' }
//     };
//     const state = userReducer(initialState, action);
//     expect(state).toEqual({
//       ...initialState,
//       error: 'Error',
//       isAuthorized: false,
//       loading: false
//     });
//   });
// });

import userReducer, { 
  loginUser, 
  getUser, 
  registerUser, 
  updateUser, 
  logoutUser 
} from './UserSlice';
import { 
  getUserApi, 
  registerUserApi, 
  loginUserApi, 
  updateUserApi, 
  logoutApi 
} from '../../utils/burger-api';
import { TUser, TUserResponse, TRegisterData } from '@utils-types';

describe('User Slice', () => {
  const initialState = {
    user: null,
    isAuthorized: false,
    loading: false,
    error: ''
  };

  afterEach(() => {
    jest.clearAllMocks(); // Сброс моков после каждого теста
  });

  // Тесты для редюсера
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

  // Тесты для thunk'ов
  it('should handle getUser thunk', async () => {
    const user = { id: 'user123', email: 'test@test.com' };
    
    // Мокаем API вызов
    jest.spyOn(global, 'getUserApi').mockResolvedValueOnce({ user });
    
    const action = await getUser();
    
    expect(action.payload).toEqual({ user });
    
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      loading: false
    });
  });

  it('should handle updateUser thunk', async () => {
    const updatedUser = { id: 'user123', email: 'updated@test.com' };
    const updateData: Partial<TRegisterData> = { email: 'updated@test.com' };
    
    // Мокаем API вызов
    jest.spyOn(global, 'updateUserApi').mockResolvedValueOnce({ user: updatedUser });
    
    const action = await updateUser(updateData);
    
    expect(action.payload).toEqual(updatedUser);
    
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: updatedUser,
      loading: false
    });
  });

  it('should handle logoutUser thunk', async () => {
    // Мокаем API вызов
    jest.spyOn(global, 'logoutApi').mockResolvedValueOnce(undefined);
    
    const action = await logoutUser();
    
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthorized: false,
      user: null,
      loading: false
    });
  });
});
