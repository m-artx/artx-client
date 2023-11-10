import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
// import ApiLoader from '../instance/ApiLoader';
import { useNavigate } from 'react-router-dom';
import dummy3 from '../instance/dummy3';

//세번째 슬라이드 - 작품카테고리로 이동

function ImageSlide() {
  // const data = ApiLoader(process.env.REACT_APP_artx_prud_new_ten); // return 값이 배열 data이다
  const data = dummy3();
  console.log(data);
  console.log('WTF');
  const navigate = useNavigate();

  const GoToProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
    console.log(id)
  };

  // 이미 배열이라면 그대로 반환하고, 아니면 배열로 만들어서 반환하는 함수
  function ensureArray(item) {
    console.log('엔슈얼어레이펑션실행');
    return Array.isArray(item) ? item : [item];
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % data.length;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + data.length) % data.length;
    setCurrentIndex(newIndex);
  };
  

  console.log(data[currentIndex]); // 이 줄을 추가하여 현재 요소를 콘솔에 출력

  return (
    <div className="max-w-[500px] h-[200px] w-full m-auto py-4 px-4 relative">
      {data.length > 0 && currentIndex >= 0 && currentIndex < data.length && (
        <div
          style={{ backgroundImage: `url(${ensureArray(data[currentIndex].productImageUrl)[0]})` }}
          className="w-full h-full bg-center bg-cover duration-500 rounded-2xl"
          onClick={() => GoToProductDetail(data[currentIndex].productId)}
        ></div>
      )}
      <div
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        {/* 해석
    1. {data.length > 0 && currentIndex >= 0 && currentIndex < data.length && (data.length > 0: data 배열에 적어도 하나 이상의 요소가 있는지 확인합니다.
    currentIndex >= 0: currentIndex가 0 또는 양수인지 확인합니다. 이는 배열의 인덱스로 사용되므로 0 이상이어야 합니다.
    currentIndex < data.length: currentIndex가 data 배열의 길이보다 작은지 확인합니다. 이는 currentIndex가 유효한 배열 인덱스 범위 내에 있어야 함을 의미합니다.
    이 모든 조건이 참일 경우에만 다음 코드 블록 ({...} 내부)이 실행됩니다.

    2. <div style={{ backgroundImage: url(${ensureArray(data[currentIndex].productImageUrl)[0]}) }} className="w-full h-full bg-center bg-cover duration-500 rounded-2xl" onClick={() => goToProductDetail(data[currentIndex].productId)}></div>

    div 요소는 인라인 스타일을 사용하여 배경 이미지를 설정합니다. ensureArray 함수(아마도 커스텀 유틸리티 함수일 것입니다)는 data[currentIndex].productImageUrl 값을 배열로 변환하고, 이 배열의 첫 번째 요소를 배경 이미지 URL로 사용합니다.
    className: Tailwind CSS 클래스를 사용하여 div의 너비와 높이를 부모 요소의 전체 크기(w-full h-full)로 설정하고, 배경 이미지가 요소 중앙에 위치하며(bg-center), 커버처럼 배경을 꽉 채우게(bg-cover) 합니다. 또한 애니메이션 지속 시간을 500ms(duration-500)로 설정하고, div 모서리를 둥글게(rounded-2xl) 처리합니다.
    onClick: 클릭 이벤트 핸들러로서, goToProductDetail 함수를 호출하며 현재 인덱스의 productId를 인자로 넘겨줍니다. 이 함수는 클릭 시 해당 제품의 상세 페이지로 이동하는 기능을 할 것입니다.
    */}

        <BsChevronCompactLeft size={30} />
      </div>
      <div
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={nextSlide}
      >
        <BsChevronCompactRight size={30} />
      </div>
    </div>
  );
}

export default ImageSlide;
