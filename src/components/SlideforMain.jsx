import React, { useState } from 'react';
import Slider from 'react-slick';
import Dummy2 from '../instance/dummy2';
// import './SlideforMain.css';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';



//테일윈드로 조절의 난항으로 일반 css로 작성함


const dummy = Dummy2();

function SlideforMain() {
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow left" onClick={onClick}>
        <BsChevronCompactLeft />
        
      </div>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow right" onClick={onClick}>
        <BsChevronCompactRight />
      </div>
    );
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    lazyLoad: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 6,
    slidesPerRow: 1,
    rows:1,

    focusOnSelect: true, // 슬라이드 선택 시 중앙으로 이동
    // initialSlide: 2, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
   
  };

  const [imageIndex, setImageIndex] = useState(0);

  // const sliderData = Dummy2(); // 이미지 데이터 가져오기

  return (
    <div className="slideBox">
      <Slider className="" {...settings}>
        {dummy.map((image, idx) => (
          // <div className={idx === 1 || idx === 2 ? 'slide  activeSlide' : 'slide'} key={idx}>
          <div>
            <img src={image.url} className="" />
          </div>
        ))}
      </Slider>
    </div>


  );
}

export default SlideforMain;
