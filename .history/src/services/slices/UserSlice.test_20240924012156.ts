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
