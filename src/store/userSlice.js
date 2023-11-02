import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // 로그인된 사용자 정보
  isAuthenticated: false, // 사용자 인증 여부
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true; // 사용자 인증 상태를 true로 설정
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false; // 사용자 인증 상태를 false로 설정
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
