import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import React from 'react';

function ImageTypeSlider() {
  const slides = [
    {
      sort: '동양화',
      content: '서정적이며 정서적 안정감을 주는 그림들',
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

  return (
    //배열 갯수만큼 리턴하여 우측으로 붙이기
    <div>
      {slides.map((slides) => (
        <div className="max-w-[260px] h-[310px] w-full m-auto py-16 px-4 relative text-black">
          <div
            style={{ backgroundImage: `url(${slides.url})` }}
            className="w-full h-full bg-center bg-cover duration-500 rounded-t-2xl"
          ></div>
          <div className="flex-col w-full h-[70px] bg-gray-200 duration-500 rounded-b-2xl">
            <p className="px-2 text-lg">{slides.sort} </p>
            <p className="px-2 text-xs text-gray-600">{slides.content} </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageTypeSlider;
