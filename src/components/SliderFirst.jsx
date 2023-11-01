import React from 'react';
import Slider from 'react-slick';
import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const images = [
  {
    url: 'http://dafenart.co.kr/mall/shop_image/201702/20%2811%29.jpg',
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

function SliderFirst() {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="text-blue border" onClick={onClick}>
        <BsChevronCompactLeft size={30} />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="text-blue border" onClick={onClick}>
        <BsChevronCompactRight size={30} />
      </div>
    );
  };

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 6,
    certerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  console.log('test slider');

  return (
    <div className="flex w-full h-full py-10 px-4 bg-white ">
      <Slider className=""  {...settings}>
        {images.map((img, idx) => (
          <div className="flex "  key={idx}>
            <img className="w-[200px] h-[200px] rounded-2xl" src={img.url} alt={`image-${idx}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderFirst;
