// src/store/userSlice.js

// 유저 상태에 대한 변경을 미리 설정할수 있다.

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLogin: false,
        userId: null,
        userRole: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
            state.userId = action.payload.username; //페이로드에서 가져오는거 잘 기억해두기
            state.userRole = action.payload.userRole;
            //현재 상태를 응답값으로 바꾸겠다
        },
        logoutUser: (state) => {
            state.user = null;
            state.isLogin = false;
            state.userId = null;
            state.userRole = null;
        },
    },
});

// export const { setUserLogin, setUserLogout } = userSlice.actions;

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
