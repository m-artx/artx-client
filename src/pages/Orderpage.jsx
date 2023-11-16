import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { setDeliveryDetail, setProductsDetail, setOrderDetails } from '../store/cartSlice';

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
    const selectedProducts = location.state?.selectedProducts || [];
    const deliveryDetail = useSelector((state) => state.cart.deliveryDetail);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo({
            ...deliveryInfo,
            [name]: value,
        });
    };
    const orderId = '5';

    // 주문하기 버튼 클릭 시 실행되는 함수
    const handleOrder = (produtId) => {
        // 주문 정보 구성
        const orderData = {
            userId: '29efc8ca-d618-44bd-b67b-29ede70ce3c9',
            orderDetails: [
                {
                    productId: 7,
                    productQuantity: 1,
                },
            ],
            deliveryDetail,
        };
        const isInputEmpty = Object.values(deliveryInfo).some((value) => value.trim() === '');
        // axios를 사용하여 서버에 주문 요청
        axios
            .post(`https://ka8d596e67406a.user-app.krampoline.com/api/orders`, orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    accept: '*/*',
                },
            })
            .then((response) => {
                console.log('주문 성공:', response.data);
                window.open(response.data.next_redirect_pc_url, '_blank');
            })
            .catch((error) => {
                // 주문 실패 시 수행할 작업
                console.error('주문 실패:', error);
            });
    };
    // 주문 취소 버튼 클릭 시 실행되는 함수
    const handleCancelOrder = () => {
        // 적절한 주문 취소 API 엔드포인트와 데이터를 설정
        const cancelOrderData = {
            // 주문 취소에 필요한 데이터 추가
        };

        axios
            .patch(`https://ka8d596e67406a.user-app.krampoline.com/api/orders/${orderId}/cancel`, cancelOrderData, {
                headers: {
                    'Content-Type': 'application/json',
                    accept: '*/*',
                },
            })
            .then((response) => {
                // 성공적으로 주문 취소가 완료되었을 때 수행할 작업
                console.log('주문 취소 성공:', response.data);
                // 적절한 리덕스 액션을 디스패치하여 상태를 업데이트할 수도 있습니다.
            })
            .catch((error) => {
                // 주문 취소 실패 시 수행할 작업
                console.error('주문 취소 실패:', error);
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
                <Link to="/shippingInfo">
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
                        <img
                            src={product.productRepresentativeImage}
                            alt="작품 이미지"
                            className="w-16 h-16 object-cover"
                        />
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
            <button
                className={`bg-${
                    Object.values(deliveryInfo).some((value) => value.trim() === '') ? 'gray-800' : 'blue-500'
                } text-white py-3 px-6 rounded-full mt-4 ${
                    Object.values(deliveryInfo).some((value) => value.trim() === '') && 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleOrder}
                disabled={Object.values(deliveryInfo).some((value) => value.trim() === '')}
            >
                결제하기
            </button>
            <button onClick={handleCancelOrder}>주문취소</button>
        </div>
    );
}
