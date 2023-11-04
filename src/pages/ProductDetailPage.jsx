import React from 'react';
import { useParams } from 'react-router-dom';
import Dummy3 from '../instance/dummy3';
import Slider from 'react-slick';
import UnivSlider from "../components/UnivSlider";

/* 임시로이미지를넣어보자! */

function ProductDetailPage() {
  let { productId } = useParams();
  // let productId = 6;
  const data = Dummy3();
  console.log('히히' + data[0].productImageUrl);

  //data의 배열 내 객체 중 productId와 일치할때 해당하는 imgaArr를 가져오자.
  let idData = data.find((product) => product.productId === parseInt(productId));
  const idDataImg = idData.productImageUrl;
  const univSlider = <UnivSlider slides={idData} />

  console.log('idData' + idData)
  console.log('idDataImg' +idDataImg)
  console.log('univSlider' +univSlider)






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
          {/* idData 가 트루라면 랜더링 falsy라면 랜더링안함 */}
          {idData && (
            <Slider className="max-w-[600px] max-h-[600px] p-auto " {...settings}>
              {idDataImg.map((url, index) => (
                <div key={index}>
                  <img className="max-w-[600px] max-h-[600px]" src={url} alt="image" />
                </div>
              ))}
              
            </Slider>
           
          )}
        </div>
        
        <div className="flex-1 flex justify-center items-center pb-20 border border-red-800 text-gray-400">
          <div className="flex flex-col">
            <div className="flex text-center">
              <p className="w-[300px] border">&lt; {data[0].productTitle} &gt;</p>
            </div>
            <div className="flex flex-col  text-center">
              <p className="w-[300px] border"> 임예원 作 </p>
              <div className="w-[300px] border p-2">
                <p className=""> 작품설명 </p>
                <p className="">ex 유화 1200*1000</p>
              </div>
            </div>
            <div className="flex flex-col text-center pt-5">
              <p className="w-[300px] border">price '{data[0].price}' </p>
              <div className="">
                <button className="w-[110px] py-2.5 px-5 m-2 text-sm  text-gray-900 bg-white rounded-lg border border-gray-200  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700">
                  cart
                </button>
                <button className="py-2.5 px-5 m-2 text-sm  text-gray-900 bg-yellow-200 rounded-lg border border-gray-200  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700">
                  kakao pay
                </button>
              </div>
            </div>
            <p className="text-sm w-[300px] text-center">[작품번호예시 code:{productId}]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// const productDetails = data.find(product => product.id === productId);

// <p>{productDetails ? productDetails.price : 'Loading...'}</p>
export default ProductDetailPage;
