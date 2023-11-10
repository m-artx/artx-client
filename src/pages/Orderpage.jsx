import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setOrderDetails } from '../store/cartSlice';
import { useLocation } from 'react-router-dom';

export default function OrderPage() {
   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
   const dispatch = useDispatch();
   const [deliveryInfo, setDeliveryInfo] = useState({
      receiverName: '',
      receiverPhoneNumber: '',
      receiverAddress: '',
   });
   const orderDetails = useSelector((state) => state.cart.orderDetails);
   const location = useLocation();
   const selectedProducts = location.state.selectedProducts;

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setDeliveryInfo({
         ...deliveryInfo,
         [name]: value,
      });
   };

   // 주문하기 버튼 클릭 시 실행되는 함수
   const handleOrder = () => {
      // 주문 정보 구성
      const orderData = {
         userId: '63b1fdff-b1fb-4141-bb4c-5342a81bd7b0',
         orderDetails: selectedProducts.map((product) => ({
            productId: product.productId,
            productQuantity: 1,
         })),
         deliveryDetail: {
            deliveryReceiver: deliveryInfo.receiverName,
            deliveryReceiverPhoneNumber: deliveryInfo.receiverPhoneNumber,
            deliveryReceiverAddress: deliveryInfo.receiverAddress,
            deliveryReceiverAddressDetail: deliveryInfo.deliveryReceiver,
         },
      };

      // axios를 사용하여 서버에 주문 요청
      axios
         .post(`https://ka8d596e67406a.user-app.krampoline.com/api/orders`, orderData, {
            headers: {
               'Content-Type': 'application/json',
               accept: '*/*',
            },
         })
         .then((response) => {
            // 성공적으로 주문이 완료되었을 때 수행할 작업
            console.log('주문 성공:', response.data);
            window.open(response.data.next_redirect_pc_url, '_blank');
         })
         .catch((error) => {
            // 주문 실패 시 수행할 작업
            console.error('주문 실패:', error);
         });
   };

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
            <Link to="/changeaddress">
               <button className="bg-white text-black border border-solid border-black">배송지 변경</button>
            </Link>
            <div className="flex flex-col space-y-2 ">
               <input
                  className="bg-white text-black"
                  type="text"
                  placeholder="수령인 이름"
                  name="receiverName"
                  value={deliveryInfo.receiverName}
                  onChange={handleInputChange}
               />
               <input
                  className="bg-white text-black"
                  type="text"
                  placeholder="수령인 번호"
                  name="receiverPhoneNumber"
                  value={deliveryInfo.receiverPhoneNumber}
                  onChange={handleInputChange}
               />
               <input
                  className="bg-white text-black"
                  type="text"
                  placeholder="수령인 주소"
                  name="receiverAddress"
                  value={deliveryInfo.receiverAddress}
                  onChange={handleInputChange}
               />
               <input
                  className="bg-white text-black"
                  type="text"
                  placeholder="수령인상세 주소"
                  name="deliveryReceiver"
                  value={deliveryInfo.deliveryReceiver}
                  onChange={handleInputChange}
               />
            </div>
         </div>
         <div className="mb-8 border-b pb-4">
            <h2 className="text-3xl font-semibold mb-4">주문 작품 정보</h2>
            {selectedProducts.map((product) => (
               <div key={product.productId} className="flex items-center mb-4 space-x-4 text-white">
                  <img src={product.productRepresentativeImage} alt="작품 이미지" className="w-16 h-16 object-cover" />
                  <div>
                     <p className="text-xl font-semibold text-white">{product.productTitle}</p>
                     <p>수량: {product.cartProductQuantity}</p>
                     <p>배송비: {product.shippingFee}</p>
                     <p>합계: {product.productPrice * product.cartProductQuantity}</p>
                  </div>
               </div>
            ))}
         </div>
         <div className="mb-8 border-b pb-4">
            <h2 className="text-3xl font-semibold mb-4">결제 수단</h2>
            <div className="flex space-x-4">
               <label>
                  <input type="radio" />
                  카카오 페이
               </label>
               <label>
                  <input type="radio" disabled />
                  신용카드
               </label>
            </div>
         </div>
         <button className="bg-blue-500 text-white py-3 px-6 rounded-full mt-4" onClick={handleOrder}>
            결제하기
         </button>
      </div>
   );
}
