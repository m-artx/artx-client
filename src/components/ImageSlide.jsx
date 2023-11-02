import React, { useState } from 'react';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Dummy2 from "../instance/dummy2";


function ImageSlide() {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];

  const dummy2 = Dummy2();

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <nextSlide />,
    prevArrow: <prevSlide />,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  };
  
  return ( 



    <div className="max-w-[500px] h-[200px] w-full m-auto py-4 px-4 relative">
      <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className="w-full h-full bg-center bg-cover duration-500 rounded-2xl"></div>

    <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded=full p-2 bg-black/20 text-white cursor-pointer" onClick={prevSlide}>
      <BsChevronCompactLeft size={30} />
    </div>
    <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded=full p-2 bg-black/20 text-white cursor-pointer" onClick={nextSlide}>
      <BsChevronCompactRight size={30}/>
    </div>



{/* 이거왜안보여 */}

  


    </div>
  )
}

export default ImageSlide;
