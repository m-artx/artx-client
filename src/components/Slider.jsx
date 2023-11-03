import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


//슬라이드는 배열 url이다 //이거비효율적
//이미지클릭안됨(링크없음)
function Slider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  if (!slides || !slides.productImageUrl || !Array.isArray(slides.productImageUrl)) {
    return null; // 슬라이드 데이터가 없을 경우 렌더링하지 않음
  }

  const data = slides.productImageUrl;


  const nextSlide = () => {
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  };

 

  return (
    <div className="max-w-[500px] h-[200px] w-full m-auto py-4 px-4 relative">
      {data.map((image, index) => (
        <div
          key={index}
          className={index === currentIndex ? "slide active" : "slide"}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <BsChevronCompactLeft
        className="left-arrow"
        onClick={prevSlide}
        size={30}
      />
      <BsChevronCompactRight
        className="right-arrow"
        onClick={nextSlide}
        size={30}
      />
    </div>
  );
}

export default Slider;
