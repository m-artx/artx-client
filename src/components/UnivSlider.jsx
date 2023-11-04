import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

//현재기능, 배열의 값을 맵으로 돌려서 div로 만들고 bg이미지로 리턴한다.
{
  /* <div>
  배열의 내부를 이미지로 갖는 디브들의연속
</div> */
}

//슬라이드는 배열 url이다 //이거비효율적
//이미지클릭안됨(링크없음)
function UnivSlider({ slides }) {
  console.log('슬라이드 내부 콘솔');
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  if (!slides || !slides.productImageUrl || !Array.isArray(slides.productImageUrl)) {
    console.log('슬라이드 데이터가 없을 경우 들어오는 if문 : ' + {slides});
    return null; // 슬라이드에 productImageUrl 데이터가 없거나 어레이가 아닌 경우 렌더링하지 않음
  }
  console.log('슬라이드 데이터가 있다면 보일 콘솔 : ' +{slides});


  // const data = slides.productImageUrl;

  // const nextSlide = () => {
  //   setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  //   console.log('슬라이드 버튼 내부 콘솔');
  // };

  // const prevSlide = () => {
  //   setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  // };

  // 나예목적
  // 어레이를 slides로 prop으로 받고 그 어레이 배열값을 div의 배경으로 넣어서 div목록을 리턴한다 
  return (
    <div className="">
      {slides.map((image, index) => (
        <div
          key={index}
          className={index === currentIndex ? 'slide active' : 'slide'}
          style={{ backgroundImage: `url(${image})`}}
        />
      ))}
      {/* <BsChevronCompactLeft className="left-arrow" onClick={prevSlide} size={30} />
      <BsChevronCompactRight className="right-arrow" onClick={nextSlide} size={30} /> */}
    </div>
  );
}

export default UnivSlider;
