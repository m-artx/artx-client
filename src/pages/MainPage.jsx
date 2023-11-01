import React from 'react';
import Anycom from '../components/Anycom';
import SliderFirst from '../components/SliderFirst';
import ImageSlide from '../components/ImageSlide';

function MainPage() {
  return (
    <div className="flex flex-col items-center">
      <input
        className="border rounded-full bg-black w-[320px] p-2 text-center placeholder-white "
        type="text"
        placeholder="검색어를 입력해주세요. 예) 작가명, 작품명"
      ></input>
      <div className="border border-red-800 flex-grow w-screen">
         {/* 첫번째 이미지칸 */}
         <div className="flex flex-col items-center py-2 w-full">
          <p className="p-4">신작:新作</p>
          <div className="flex border border-blue-800 w-screen h-[300px]">
            {/* 이건 잘되는데? */}
            <img className="w-[300px] h-[200px]" 
            src="http://dafenart.co.kr/mall/shop_image/201702/20%2811%29.jpg"/>    
            {/* 슬라이드왜이래? */}
            <SliderFirst className="" />
          </div>
        </div>
        {/* 두번째 이미지칸 */}
        <div className="flex flex-col items-center py-2">
          <p className="p-4">최근 판매된 작품</p>
          <div className="flex border border-blue-800 w-screen h-[200px]">
            <ImageSlide className="min-h-[200px]" />
          </div>
        </div>
      
      </div>

    </div>
  );
}

export default MainPage;
