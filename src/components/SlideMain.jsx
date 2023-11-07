import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import ApiLoader from '../instance/ApiLoader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// 최상위 슬라이드


const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-[50%] left-[-50px] transform -translate-y-1/2 cursor-pointer z-10 text-4xl"
      onClick={onClick}
    >
      <BsChevronCompactLeft />
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-[50%] right-[-50px] transform -translate-y-1/2 cursor-pointer z-10 text-4xl"
      onClick={onClick}
    >
      <BsChevronCompactRight />
    </div>
  );
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 6, // 한 화면에 보여질 슬라이드 수 (1로 설정)
  slidesToScroll: 1, // 한번에 스크롤할 슬라이드 수 (1로 설정)
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  dots: false,
  accessibility: true,
  draggable: true,
  initialSlide: 1, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
  // centerMode: true, // 가운데 모드 활성화
  centerPadding: '0',
  lazyLoad: true,
};

function SlideMain() {
  const apiData = ApiLoader(process.env.REACT_APP_artx_prod_pop_ten);
  //apiData가 array가 아닌 경우도 처리해야하나?

  console.log(`apiData:`, apiData);
  const apiData2 = 'http://64.110.89.251:8081/api/products/main?type=LATEST';
  console.log(`apiData2:`, apiData2);
  const navigate = useNavigate();
  const goToProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  return (
    <div className="border border-yellow-200 text-white ">
      <Slider className="relative min-h-[200px]" {...settings}>
        {apiData.map((image, idx) => (
          <div key={idx} className="h-[200px]">
            <div
              className="flex-1 w-[80%] h-[200px]  border border-red-500 rounded-xl"
              style={{
                backgroundImage: `url(${image.productRepresentativeImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => goToProductDetail(image.productId)}
            ></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideMain;
