import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import ApiLoader from '../instance/ApiLoader';
import { useNavigate } from 'react-router-dom';

function ImageSlide() {
  const data = ApiLoader(process.env.REACT_APP_artx_prud_new_ten); // return 값이 배열 data이다
  console.log(data);
  console.log('WTF');
  const navigate = useNavigate();

  const goToProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

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
          style={{ backgroundImage: `url(${data[currentIndex].productImageUrl[0]})` }}
          className="w-full h-full bg-center bg-cover duration-500 rounded-2xl"
          onClick={() => goToProductDetail(data[currentIndex].productId)}
        ></div>
      )}
      <div
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded=full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
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
