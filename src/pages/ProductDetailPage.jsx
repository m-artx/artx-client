import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import ApiLoader from '../instance/ApiLoader';
import axios from 'axios';

// 제품 상세페이지

function ProductDetailPage() {
  let { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // 데이터 로딩 시작
      try {
        const response = await axios.get(`${process.env.REACT_APP_artx_base_url}products/${productId}`);
        const prodData = response.data;
        console.log(prodData)

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
                  <p className="">ex 유화 1200*1000</p>
                </div>
              </div>
              <div className="flex flex-col text-center pt-5">
                <p className="w-[300px] border">price '{productData.productPrice}' </p>
                <div className="">
                  <button className="w-[110px] py-2.5 px-5 m-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700">
                    cart
                  </button>
                  <button className="py-2.5 px-5 m-2 text-sm text-gray-900 bg-yellow-200 rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700">
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
