import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import ApiLoader from '../instance/ApiLoader';
import { useNavigate } from 'react-router-dom';


const SlideSecond = () => {
  const sliderRef1 = useRef(); // 첫 번째 슬라이더 ref

  const apiData = ApiLoader(process.env.REACT_APP_artx_prod_new_ten);
  // console.log(apiData.length)
  const doubleData = [...apiData, ...apiData]

  // 데이터가 준비되었다면, 배열을 나눕니다.
  const halfIndex = Math.ceil(apiData.length / 2);
  const firstHalf = apiData.slice(0, halfIndex);
  const secondHalf = apiData.slice(halfIndex);

  const [currentIndex1, setCurrentIndex1] = useState(0); // 첫 번째 슬라이더 인덱스 상태
  const [currentIndex2, setCurrentIndex2] = useState(0); // 첫 번째 슬라이더 인덱스 상태

  const navigate = useNavigate();
  const goToProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };
  

  // 첫 번째 슬라이더 함수
  const play1 = () => {
    sliderRef1.current.slickPlay();
  };
  const pause1 = () => {
    sliderRef1.current.slickPause();
  };

  // 두 번째 슬라이더 함수
  // const play2 = () => {
  //   sliderRef2.current.slickPlay();
  // };
  // const pause2 = () => {
  //   sliderRef2.current.slickPause();
  // };

  const settings1 = {
    // centerMode:true,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 1,
    draggable: true,
    arrows: false,
    beforeChange: (current, next) => setCurrentIndex1(next),
  };

  // 두 번째 슬라이더 설정 (첫 번째 슬라이더 설정을 상속받음)
  const settings2 = {
    // centerMode:true,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 5,  
    draggable: true,
    arrows: false,
    beforeChange: (current, next) => setCurrentIndex2(next),
  };

  return (
    <div className="h">
      {/* 첫 번째 슬라이더 */}
      <Slider {...settings1} className="pr-[50px]">
        {doubleData.map((item, idx) => (
          <div key={idx} className="h-[100px] pl-2 ">
            <div
              className="rounded-xl h-[200px]"
              style={{
                backgroundImage: `url(${item.productRepresentativeImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => goToProductDetail(item.productId)}

            ></div>
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: 'center' }}></div>
      {/* 두 번째 슬라이더 */}
      <Slider {...settings2} className="pl-[50px]">
        {doubleData.map((item, idx) => (
          <div key={idx} className="h-[100px] pl-2">
            <div
              className="rounded-xl h-[200px]"
              style={{
                backgroundImage: `url(${item.productRepresentativeImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => goToProductDetail(item.productId)}

            ></div>
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: 'center' }}></div>
    </div>
  );
};

export default SlideSecond;