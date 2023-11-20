import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import { setDeliveryDetail } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
// 제품 상세페이지
// api 컴포넌트 사용해서 바꿔보자

function ProductDetailPage() {
    let { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const cartId = 25;
    const dispatch = useDispatch();
    const deliveryDetail = useSelector((state) => state.cart.deliveryDetail);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true); // 데이터 로딩 시작
            try {
                const response = await axios.get(
                    `http://ka8d596e67406a.user-app.krampoline.com/api/products/${productId}`
                );
                const prodData = response.data;
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
        try {
            // 상품을 카트에 추가하는 요청을 보냅니다.
            await axios.post(
                `https://ka8d596e67406a.user-app.krampoline.com/api/carts/${cartId}/products/${productId}`,
                {
                    cartId: 25,
                    productId: productData.productId,
                },
                {
                    withCredentials: false,
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
    const ensuredImages = Array.isArray(productData.productImages)
        ? productData.productImages
        : [productData.productImages];
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
        const orderData = {
            userId: '29efc8ca-d618-44bd-b67b-29ede70ce3c9',
            orderDetails: [
                {
                    productId: productData.productId,
                    productQuantity: 1, // 주문 수량, 원하는 수량으로 변경 가능
                },
            ],
            deliveryDetail,
        };

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
                console.error('주문 실패:', error);

                // 실패 시에도 API에 요청을 보낼 수 있도록 여기서 추가적인 API 호출을 수행
                // 예시: 실패 정보를 서버에 기록하는 API 호출
                axios
                    .post('https://example.com/api/log-order-failure', {
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
                window.location.href = '/kakaofail';
            });
    };
    return (
        <div className="flex w-full max-w-[1500px]">
            {/* 이미지 슬라이더 */}
            <div className="flex pl-20 border w-full h-full">
                <div className="p-20 border">
                    <Slider className="max-w-[600px] max-h-[600px] p-auto" {...settings}>
                        {ensuredImages.map((url, index) => (
                            <div key={index}>
                                <img className="max-w-[600px] max-h-[600px] " src={url} alt="Product" />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/*  */}
                <div className="flex-1 flex justify-center items-center pb-20 border border-red-800 text-gray-400">
                    {productData && (
                        <div className="flex flex-col">
                            <div className="flex text-center">
                                <p className="w-[300px] border">&lt; {productData.productTitle} &gt;</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="w-[300px] border"> 작가이름 api </p>
                                <div className="w-[300px] border p-2">
                                    <p className=""> {productData.productDescription} </p>
                                    {/* <p className="">ex 유화 1200*1000</p> */}
                                </div>
                            </div>
                            <div className="flex flex-col text-center pt-5">
                                <p className="w-[300px] border">price '{productData.productPrice}' </p>
                                <div className="">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-[110px] py-2.5 px-5 m-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        Cart
                                    </button>
                                    <button
                                        className="py-2.5 px-5 m-2 text-sm text-gray-900 bg-yellow-200 rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                                        onClick={handlePay}
                                    >
                                        kakao pay
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm w-[300px] text-center">[product code:{productData.productId}]</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
