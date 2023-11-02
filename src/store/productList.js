import { createSlice } from '@reduxjs/toolkit';

// 초기 이미지 목록 데이터
const initialState = {
  ProductList: [
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 1',
      name: 'name',
      price: 10000,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 2',
      name: 'name',
      price: 15000,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 3',
      name: 'name',
      price: 12000,
    },
    {
      url: 'https://dummyimage.com/723x403',
      title: 'Title 4',
      name: 'name',
      price: 8000,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 5',
      name: 'name',
      price: 10000,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 6',
      name: 'name',
      price: 15000,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 7',
      name: 'name',
      price: 12000,
    },
    {
      url: 'https://dummyimage.com/723x403',
      title: 'Title 8',
      name: 'name',
      price: 8000,
    },
  ],
};

const ProductListSlice = createSlice({
  name: 'ProductList',
  initialState,
  reducers: {
    // 이미지 추가 액션
    addImage: (state, action) => {
      state.ProductList.push(action.payload); // 새 이미지를 이미지 목록에 추가
    },

    // 이미지 삭제 액션
    removeImage: (state, action) => {
      const { url } = action.payload;
      state.ProductList = state.ProductList.filter((image) => image.url !== url); // 이미지 목록에서 삭제
    },

    // 이미지 업데이트 액션
    updateImage: (state, action) => {
      const { url, updatedData } = action.payload;
      const imageToUpdate = state.ProductList.find((product) => product.url === url);
      if (imageToUpdate) {
        // 이미지 정보를 업데이트
        Object.assign(imageToUpdate, updatedData);
      }
    },
  },
});

export const { addImage, removeImage, updateImage } = ProductListSlice.actions;

export const ProductListReducer = ProductListSlice.reducer;

export default ProductListSlice;
