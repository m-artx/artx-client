import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderPage() {
   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // 선택된 결제 수단을 담는 상태
   // 수정: cartItems를 가져올 때 state.cart.items가 아니라 state.cart.cartItems를 사용
   const cartItems = useSelector((state) => state.cart.cartItems);
   const dispatch = useDispatch();

   const handlePaymentMethod = (method) => {
      // 선택된 결제 수단 업데이트
      setSelectedPaymentMethod(method);
   };

   console.log(cartItems);
   return (
      <div className="text-white border p-8">
         <div className="mb-8 border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">주문 고객</h3>
            <div className="flex flex-col space-y-2">
               <span>주문 고객 이름: </span>
               <span>주문 고객 전화번호: </span>
            </div>
         </div>
         <div className="mb-8 border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">배송 정보</h3>
            <div className="flex flex-col space-y-2">
               <span>수령인 이름: </span>
               <span>수령인 번호: </span>
               <span>수령인 주소: </span>
            </div>
         </div>
         <div className="mb-8 border-b pb-4">
            <h2 className="text-3xl font-semibold mb-4">주문 작품 정보</h2>
            {cartItems.map((item) => (
               <div key={item.productId} className="flex items-center mb-4 space-x-4 text-white">
                  <img src={item.productRepresentativeImage} alt="작품 이미지" className="w-16 h-16 object-cover" />
                  <div>
                     <p className="text-xl font-semibold text-white">{item.productTitle}</p>
                     <p>수량: {item.cartProductQuantity}</p>
                     <p>배송비: {item.shippingFee}</p>
                     <p>합계: {item.productPrice * item.cartProductQuantity}</p>
                  </div>
               </div>
            ))}
         </div>
         <div className="mb-8 border-b pb-4">
            <h2 className="text-3xl font-semibold mb-4">결제 수단</h2>
            <div className="flex space-x-4">
               <label>
                  <input
                     type="radio"
                     name="paymentMethod"
                     checked={selectedPaymentMethod === 'KakaoPay'}
                     onChange={() => handlePaymentMethod('KakaoPay')}
                  />
                  카카오 페이
               </label>
               <label>
                  <input
                     type="radio"
                     name="paymentMethod"
                     checked={selectedPaymentMethod === 'CreditCard'}
                     onChange={() => handlePaymentMethod('CreditCard')}
                  />
                  신용카드
               </label>
            </div>
         </div>
         <button className="bg-blue-500 text-white py-3 px-6 rounded-full mt-4">결제하기</button>
      </div>
   );
}
