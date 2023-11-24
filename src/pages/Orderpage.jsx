import React, { useState, useEffect } from 'react';
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
    const orderId = '';
    const [storedAddressInfo, setStoredAddressInfo] = useState(null);

    // 주문하기 버튼 클릭 시 실행되는 함수
    const handleOrder = (produtId) => {
        // 주문 정보 구성
        const orderData = {
            orderProductDetails: selectedProducts.map((product) => ({
                productId: 1,
                productQuantity: 2,
            })),
            orderDeliveryDetail: {
                deliveryId: '',
                deliveryReceiver: '',
                deliveryReceiverPhoneNumber: '',
                deliveryReceiverAddress: '',
                deliveryReceiverAddressDetail: '',
                deliveryTrackingNumber: '',
                deliveryFee: 0,
                deliveryStatus: 'DELIVERY_CREATED',
            },
        };
        const isInputEmpty = Object.values(deliveryInfo).some((value) => value.trim() === '');
        // axios를 사용하여 서버에 주문 요청
        const accessToken = localStorage.getItem('accessToken');
        axios
            .post(`https://ka8d596e67406a.user-app.krampoline.com/api/orders`, orderData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
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
    useEffect(() => {
        // 로컬 스토리지에서 addressInfo를 가져옴
        const storedData = localStorage.getItem('addressInfo');

        // 가져온 데이터가 있다면 파싱하여 state에 설정
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setStoredAddressInfo(parsedData);
        }

        // 페이지 로드 시 자동으로 주소 정보 표시
        displayAddressInfo();
    }, []); // 빈 의존성 배열로 한 번만 실행되도록 설정

    // storedAddressInfo를 사용하여 원하는 작업 수행
    const displayAddressInfo = () => {
        if (storedAddressInfo) {
            return (
                <div>
                    <p>이름: {storedAddressInfo.name}</p>
                    <p>전화번호: {storedAddressInfo.phoneNumber}</p>
                    <p>우편번호: {storedAddressInfo.zipcode}</p>
                    <p>주소: {storedAddressInfo.address}</p>
                    <p>상세주소: {storedAddressInfo.address2}</p>
                </div>
            );
        } else {
            return <p>저장된 주소 정보가 없습니다.</p>;
        }
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
                    {/* {displayAddressInfo()} */}
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
