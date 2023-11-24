// cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 액션을 위한 thunk 생성
export const fetchCartData = createAsyncThunk('cart/fetchCartData', async (cartId, { getState }) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`https://ka8d596e67406a.user-app.krampoline.com/api/cart`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.cartProductDetails;
    } catch (error) {
        throw error;
    }
});

// 리덕스 slice 생성
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProductDetails: {
            content: [],
        },
        selectedItems: [
            {
                productId: '',
                productQuantity: '',
            },
        ],
        selectAll: false,
        status: 'idle', // 비동기 작업 상태를 관리할 필드 추가
        userId: '', // 사용자 ID
        orderDetails: [
            {
                productId: '',
                productQuantity: '',
            },
        ], // 주문 상세 정보
        deliveryDetail: {
            deliveryReceiver: '',
            deliveryReceiverPhoneNumber: '',
            deliveryReceiverAddress: '',
            deliveryReceiverAddressDetail: '',
        }, // 배송 정보
        selectedPaymentMethod: '', // 선택된 결제 수단
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
        setDeliveryDetail: (state, action) => {
            state.deliveryDetail = action.payload;
        },
        setSelectedPaymentMethod: (state, action) => {
            state.selectedPaymentMethod = action.payload;
        },
        resetOrder: (state) => {
            state.userId = '';
            state.orderDetails = [];
            state.deliveryDetail = {
                deliveryReceiver: '',
                deliveryReceiverPhoneNumber: '',
                deliveryReceiverAddress: '',
                deliveryReceiverAddressDetail: '',
            };
            state.selectedPaymentMethod = '';
        },
        setCartProductDetails: (state, action) => {
            const newcartProductDetails = action.payload;
            console.log('Received newcartProductDetails:', newcartProductDetails);

            if (Array.isArray(newcartProductDetails)) {
                state.cartProductDetails = newcartProductDetails;
                console.log('Updated cartProductDetails:', state.cartProductDetails);
            } else {
                console.error('Invalid cartProductDetails type. Expected an array.');
            }
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
            // state.cartProductDetails가 배열이 아닌 경우 초기화
            const availableProducts = Array.isArray(state.cartProductDetails)
                ? state.cartProductDetails.filter((item) => item.productQuantity > 0)
                : [];

            // 전체 선택 상태 변경
            state.selectAll = !state.selectAll;

            // 선택된 상품 업데이트
            state.selectedItems = state.selectAll ? availableProducts.map((item) => item.productId) : [];
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
        builder.addCase(fetchCartData.fulfilled, (state, action) => {
            // API 응답에서 필요한 데이터 추출
            const cartProductDetails = action.payload;
            const content = cartProductDetails.content;

            // cartProductDetails를 업데이트
            state.cartProductDetails = {
                content,
            };
        });
    },
});

export const {
    setCartProductDetails,
    toggleItemSelection,
    toggleSelectAll,
    selectedItems,
    decreaseQuantity,
    increaseQuantity,
    removeFromSelected,
    setSelectAll,
    setSelectedItems,
    setUserId,
    setOrderDetails,
    setDeliveryDetail,
    setSelectedPaymentMethod,
    resetOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
