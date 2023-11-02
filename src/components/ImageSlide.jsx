import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import ApiLoader from '../instance/ApiLoader';
import { useNavigate } from 'react-router-dom';


function ImageSlide() {
  const data = ApiLoader(); // return 값이 data이다
  console.log(data);
  console.log('WTF');
  const navigate = useNavigate();

  const goToProductPage = (id) => {
    navigate(`/productpage/${id}`);
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


  return (
    <div className="max-w-[500px] h-[200px] w-full m-auto py-4 px-4 relative">
      <div
        style={{ backgroundImage: `url(${data[currentIndex].productImageUrl})` }}
        className="w-full h-full bg-center bg-cover duration-500 rounded-2xl"
        onClick={() => goToProductPage(data.productId)}
      ></div>
      <div
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded=full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </div>
      <div
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded=full p-2 bg-black/20 text-white cursor-pointer"
        onClick={nextSlide}
      >
        <BsChevronCompactRight size={30} />
      </div>
    </div>
  );
}

export default ImageSlide;
