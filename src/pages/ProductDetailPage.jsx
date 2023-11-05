import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import ApiLoader from "../instance/ApiLoader";


function ProductDetailPage() {
  let { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setId = async (api) => {
    const apiEndpoint = `${api}${productId}`;
    console.log('apiEndpoint : ' + apiEndpoint);
    const data = await ApiLoader(apiEndpoint); // ApiLoader는 프로미스를 반환해야 합니다.
    return data; // 결과 데이터를 반환합니다.
  };

  
  useEffect(() => {
    async function fetchData() {
      try {
        // setId 함수가 비동기로 실행되고 결과를 반환하기를 기다립니다.
        const allProdData = await setId(process.env.REACT_APP_artx_prod);
        // 여기서 allProdData가 배열인지 확인합니다.
        if (Array.isArray(allProdData)) {
          const product = allProdData.find((p) => p.productId === parseInt(productId));
          if (product) {
            setProductData(product);
          } else {
            console.error("Product not found");
          }
        } else {
          console.error("Invalid product data format", allProdData);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [productId]);



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  // 이제 productData는 정의된 상태입니다.
  const ensuredImages = Array.isArray(productData.productRepresentativeImage)
    ? productData.productRepresentativeImage
    : [productData.productRepresentativeImage];

  
  // 슬라이더 설정
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex w-screen max-w-[1500px]">
      <div className="flex border w-full h-full">
        <div className="p-20 pl-[200px] border">
          {productData && (
            <Slider className="max-w-[600px] max-h-[600px] p-auto " {...settings}>
              {ensuredImages.map((url, index) => (
                <div key={index}>
                  <img className="max-w-[600px] max-h-[600px]" src={url} alt="Product" />
                </div>
              ))}
            </Slider>
          )}
        </div>
        
        <div className="flex-1 flex justify-center items-center pb-20 border border-red-800 text-gray-400">
          {productData && (
            <div className="flex flex-col">
              <div className="flex text-center">
                <p className="w-[300px] border">&lt; {productData.productTitle} &gt;</p>
              </div>
              <div className="flex flex-col text-center">
                <p className="w-[300px] border"> 임예원 作 </p>
                <div className="w-[300px] border p-2">
                  <p className=""> 작품설명 </p>
                  <p className="">ex 유화 1200*1000</p>
                </div>
              </div>
              <div className="flex flex-col text-center pt-5">
                <p className="w-[300px] border">price '{productData.price}' </p>
                <div className="">
                  <button className="w-[110px] py-2.5 px-5 m-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700">
                    cart
                  </button>
                  <button className="py-2.5 px-5 m-2 text-sm text-gray-900 bg-yellow-200 rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700">
                    kakao pay
                  </button>
                </div>
              </div>
              <p className="text-sm w-[300px] text-center">[작품번호예시 code:{productId}]</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
