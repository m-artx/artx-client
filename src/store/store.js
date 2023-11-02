import { configureStore } from '@reduxjs/toolkit';
import ProductListSlice, { addImage, removeImage, updateImage } from '../store/productList'; // 슬라이스 파일 경로

import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    ProductList: ProductListSlice, // 수정된 슬라이스 이름으로 변경
    user: userReducer,
  },
});

export default store;
