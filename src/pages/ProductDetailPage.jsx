import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import { useSelector } from 'react-redux';
import customAxios from '../store/customAxios';

// 제품 상세페이지
// api 컴포넌트 사용해서 바꿔보자

// productCreatedAt: '2023-11-26T12:31:27.30324';
// productId: 8;
// productLink: 'https://ka8d596e67406a.user-app.krampoline.com/api/products/8';
// productPrice: 45000;
// productRepresentativeImage: 'https://ka8d596e67406a.user-app.krampoline.com/api/images/product_7af8b447-2f84-4c33-aa92-6328d0fd8adc_Rectangle_717.png';
// productStockQuantity: 100;
// productTitle: '마더';

function ProductDetailPage() {
    let { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const dispatch = useDispatch();
    const orderDeliveryDetail = useSelector((state) => state.cart.orderDeliveryDetail);

    useEffect(() => {
        async function fetchData() {
            const accessToken = localStorage.getItem('accessToken');
            setIsLoading(true); // 데이터 로딩 시작
            try {
                const response = await customAxios.get(`/api/products/${productId}`);

                const prodData = response.data.productReadSummaryResponse;
                console.log(prodData);

                // 데이터가 배열로 오는 경우, 해당 productId를 가진 제품을 찾습니다.
                const product = Array.isArray(prodData)
                    ? prodData.find((p) => p.productId === parseInt(productId, 10))
                    : prodData;

                if (product) {
                    setProductData(product); // 제품 데이터 설정
                } else {
                    console.error('Product not found with id: ' + productId);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
            setIsLoading(false); // 데이터 로딩 완료
        }

        fetchData();
    }, [productId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!productData) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        const accessToken = localStorage.getItem('accessToken');
        const productIdToAdd = productData.productId; // 실제로 카트에 추가할 상품의 ID

        try {
            // 상품을 카트에 추가하는 요청을 보냅니다.
            await axios.post(
                `https://ka8d596e67406a.user-app.krampoline.com/api/cart`,
                {
                    productId: productId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // 성공 시 메시지를 표시하거나 다른 작업을 수행할 수 있습니다.
            alert('상품이 카트에 추가되었습니다.');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            // 실패 시에 대한 처리를 추가할 수 있습니다.
        }
    };
    // 제품 이미지가 배열이 아닐 경우를 대비해 배열로 변환합니다.
    const ensuredImages = Array.isArray(productData.productRepresentativeImage)
        ? productData.productRepresentativeImage
        : [productData.productRepresentativeImage];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!productData) {
        return <div>Product not found</div>;
    }

    // 슬라이더 설정
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handlePay = () => {
        // 결제 정보 구성
        const accessToken = localStorage.getItem('accessToken');
        const orderData = {
            orderProductDetails: [
                {
                    productId: productId,
                    productQuantity: 1, // 주문 수량을 1로 설정하거나 필요에 따라 조절
                },
            ],
            orderDeliveryDetail: {
                deliveryId: 'das',
                deliveryReceiver: 'das',
                deliveryReceiverPhoneNumber: 'sad',
                deliveryReceiverAddress: 'asd',
                deliveryReceiverAddressDetail: 'asd',
                deliveryTrackingNumber: 'da',
                deliveryFee: 0,
                deliveryStatus: 'DELIVERY_CREATED',
            },
        };

        axios
            .post(`https://ka8d596e67406a.user-app.krampoline.com/api/orders`, orderData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: false,
            })
            .then((response) => {
                console.log('주문 성공:', response.data);
                window.open(response.data.next_redirect_pc_url, '_blank');
            })
            .catch((error) => {
                console.error('주문 실패:', error);
                console.error('에러 응답:', error.response); // 에러 응답 출력

                // 실패 시에도 API에 요청을 보낼 수 있도록 여기서 추가적인 API 호출을 수행
                // 예시: 실패 정보를 서버에 기록하는 API 호출
                axios
                    .post('https://example.com/api/orders', {
                        error: error.message,
                        orderData,
                    })
                    .then((logResponse) => {
                        console.log('주문 실패 기록 성공:', logResponse.data);
                    })
                    .catch((logError) => {
                        console.error('주문 실패 기록 실패:', logError);
                    });

                // 여기서 페이지 이동 코드를 추가
                // 예시: 실패 페이지로 이동
                // window.location.href = '/kakaofail';
            });
    };
    return (
        <div className="flex w-full max-w-[1500px]">
            {/* 이미지 슬라이더 */}
            <div className="flex   w-full h-full " >
                <div className="p-10  mr-[100px]">
                    <div>
                        <img
                            className="max-w-[600px] max-h-[600px]"
                            src={productData.productRepresentativeImage}
                            alt="Product"
                        />
                    </div>
                </div>

                {/*  */}
                <div className="flex-1 flex justify-center items-center  mt-10 text-gray-300">
                    {productData && (
                        <div className="flex flex-col justify-center w-[300px] ">
                            <div className="flex flex-col justify-center items-center text-center py-2">
                                <p className=" px-4"> '{productData.productTitle} '</p>
                            </div>
                            <div className="py-2 flex flex-col justify-center items-center text-center">
                                <p className="px-4 pb-4"> 이무명 </p>
                                <div className="py-5 border flex flex-col justify-center items-center text-center">
                                    <p className="italic px-4"> " 가로 200mm, 세로 50mm ,</p>
                                    <p className="italic px-4"> oil painting "</p>
                                </div>
                            </div>
                            <div className="py-2 flex flex-col justify-center items-center text-center">
                                <p className="p-4">
                                    price {productData.productPrice.toLocaleString()}{' '}
                                </p>
                                <div className="">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-[110px] py-2.5 px-5 m-2 mb-0 text-sm text-gray-900 bg-white rounded-lg   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        Cart
                                    </button>
                                    <button
                                        className="py-2.5 px-5 m-2  mb-0 text-sm text-gray-900 bg-yellow-400 rounded-lg  dark:bg-yellow-400 dark:text-black-400 dark:border-gray-600 dark:hover:bg-gray-700 "
                                        onClick={handlePay}
                                    >
                                        Kakao Pay
                                    </button>
                                    <p className="text-sm w-[300px]  text-center">
                                        {/* [product code:{productData.productId}] */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
