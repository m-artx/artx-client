import React from 'react';
import Anycom from '../components/Anycom';
import ImageSlide from '../components/ImageSlide';
import SlideforMain from '../components/SlideforMain';
import SlideMain from "../components/SlideMain";


function MainPage() {
  return (
    <div className="flex flex-col items-center max-w-[1500px]">
      <input
        className="border rounded-full bg-black w-[320px] p-2 text-center placeholder-white "
        type="text"
        placeholder="검색어를 입력해주세요. 예) 작가명, 작품명"
      ></input>

      <div className="border border-red-800 w-screen grid grid-rows-2 h-full ">
       {/* 첫번째 이미지칸 */}
       <div className="flex flex-col items-center py-2 border border-purple-800 overflow-hidden">
          <p className="p-4">신작:新作</p>
          <div className="w-screen border flex-grow">
            {/* <SlideforMain /> */}
            <SlideMain />
          </div>
        </div>

        {/* 두번째 이미지칸 */}
        <div className="flex flex-col items-center py-2 border border-purple-800">
          <p className="p-4 ">최근 판매된 작품</p>
          <div className="flex border w-screen">
            <ImageSlide />            
            </div>
        </div>
  
        <Anycom />

      </div>


    </div>
  );
}

export default MainPage;
