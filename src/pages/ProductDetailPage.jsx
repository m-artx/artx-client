import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';

// 제품 상세페이지
// api 컴포넌트 사용해서 바꿔보자

function ProductDetailPage() {
    let { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const cartId = 1;
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true); // 데이터 로딩 시작
            try {
                const response = await axios.get(`${process.env.REACT_APP_artx_base_url}products/${productId}`);
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

    const handleAddToCart = async () => {
        try {
            // 상품을 카트에 추가하는 요청을 보냅니다.
            await axios.post(
                `https://ka8d596e67406a.user-app.krampoline.comapi/products?/${cartId}/products/${productId}`,
                {
                    productId: productData.productId,
                    quantity: 1, // 원하는 수량으로 변경 가능
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
        // 예시로 formData라는 객체를 생성
        const formData = {
            // 필요한 폼 필드들을 여기에 추가
        };

        // 입력 필드 중 하나라도 비어 있으면 isInputEmpty를 true로 설정
        const isInputEmpty = Object.values(formData).some((value) => value.trim() === '');

        if (isInputEmpty) {
            // 필요한 입력 필드들이 비어있을 때 수행할 작업
            console.error('Some input fields are empty.');
            return;
        }

        // axios를 사용하여 서버에 주문 요청
        axios
            .post(
                `https://ka8d596e67406a.user-app.krampoline.com/api/products?/orders`,
                {
                    productId: productData.productId,
                    quantity: 1, // 원하는 수량으로 변경 가능
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        accept: '*/*',
                    },
                }
            )
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
