import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import Dummy3 from '../instance/dummy2';

const data = Dummy3();
const halfIndex = Math.ceil(data.length / 2); // 올바른 halfIndex 계산

// 배열 나눔
const firstHalf = data.slice(0, halfIndex);
const secondHalf = data.slice(halfIndex);

const SlideSecond = () => {
  const sliderRef1 = useRef(); // 첫 번째 슬라이더 ref
  const sliderRef2 = useRef(); // 두 번째 슬라이더 ref

  // 첫 번째 슬라이더 함수
  const play1 = () => {
    sliderRef1.current.slickPlay();
  };
  const pause1 = () => {
    sliderRef1.current.slickPause();
  };

  // 두 번째 슬라이더 함수
  const play2 = () => {
    sliderRef2.current.slickPlay();
  };
  const pause2 = () => {
    sliderRef2.current.slickPause();
  };

  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  const settings1 = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 2,
    beforeChange: (current, next) => setCurrentIndex1(next),
  };

  const settings2 = {
    ...settings1, // 첫 번째 슬라이더 설정을 상속하고,
    beforeChange: (current, next) => setCurrentIndex2(next), // 다른 beforeChange 함수를 사용
  };

  return (
    <div>
      이미지가 뜨지 않네. 테일윈드 css처리가 필요할듯.
      {/* 첫 번째 슬라이더 */}
      <Slider ref={sliderRef1} {...settings1}>
        {firstHalf.map((image, index) => (
          <div
            key={index}
            className={`w-24 h-24 bg-cover bg-no-repeat bg-center rounded-md ${index === currentIndex1 ? 'ring-2 ring-blue-500' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </Slider>
      <div style={{ textAlign: 'center' }}>
        <button className="button" onClick={play1}>
          Play
        </button>
        <button className="button" onClick={pause1}>
          Pause
        </button>
      </div>

      {/* 두 번째 슬라이더 */}
      <Slider ref={sliderRef2} {...settings2}>
        
        {secondHalf.map((image, index) => (
          <div
            key={index}
            className={index === currentIndex2 ? 'slide active' : 'slide'}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </Slider>
      <div style={{ textAlign: 'center' }}>
        <button className="button" onClick={play2}>
          Play
        </button>
        <button className="button" onClick={pause2}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default SlideSecond;
