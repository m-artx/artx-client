// src/store/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
   name: 'user',
   initialState: {
      user: null,
   },
   reducers: {
      loginUser: (state, action) => {
         state.user = action.payload;
      },
   },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
