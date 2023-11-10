// cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 액션을 위한 thunk 생성
export const fetchCartData = createAsyncThunk('cart/fetchCartData', async (cartId) => {
   try {
      const response = await axios.get(`${process.env.REACT_APP_artx_base_url}carts/${cartId}`);
      return response.data;
   } catch (error) {
      throw error;
   }
});

// 리덕스 slice 생성
const cartSlice = createSlice({
   name: 'cart',
   initialState: {
      cartItems: [],
      selectedItems: [],
      selectAll: false,
      status: 'idle', // 비동기 작업 상태를 관리할 필드 추가
   },
   reducers: {
      setCartItems: (state, action) => {
         state.cartItems = action.payload;
      },
      toggleItemSelection: (state, action) => {
         const productId = action.payload;
         const index = state.selectedItems.indexOf(productId);

         if (index !== -1) {
            state.selectedItems.splice(index, 1);
         } else {
            state.selectedItems.push(productId);
         }
      },
      toggleSelectAll: (state) => {
         state.selectAll = !state.selectAll;
         state.selectedItems = state.selectAll ? state.cartItems.map((item) => item.productId) : [];
      },
      decreaseQuantity: (state, action) => {
         // 여기에 감소 로직 추가
      },
      increaseQuantity: (state, action) => {
         // 여기에 증가 로직 추가
      },
      removeFromSelected: (state) => {
         // 여기에 제거 로직 추가
      },
      setSelectAll: (state, action) => {
         // 여기에 전체 선택 로직 추가
      },
      setSelectedItems: (state, action) => {
         // 여기에 선택된 항목 설정 로직 추가
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchCartData.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchCartData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.cartItems = action.payload.cartItemDetails;
         })
         .addCase(fetchCartData.rejected, (state) => {
            state.status = 'failed';
         });
   },
});

export const {
   setCartItems,
   toggleItemSelection,
   toggleSelectAll,
   decreaseQuantity,
   increaseQuantity,
   removeFromSelected,
   setSelectAll,
   setSelectedItems,
} = cartSlice.actions;

export default cartSlice.reducer;
