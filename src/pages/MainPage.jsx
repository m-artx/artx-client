import React from 'react';
import ImageSlide from '../components/ImageSlide';
import SlideMain from '../components/SlideMain';
import ApiLoader from '../instance/ApiLoader';

function MainPage() {
  const data = ApiLoader(); // return 값이 data이다

  return (
    <div className="flex flex-col items-center border max-w-[1500px]">
      <input
        className="border rounded-full bg-black w-[320px] p-2 text-center placeholder-white "
        type="text"
        placeholder="검색어를 입력해주세요. 예) 작가명, 작품명"
      ></input>

      <div className="border border-red-800 grid grid-rows-2 h-full">
        {/* 첫번째 이미지칸 */}
        <div className="flex flex-col items-center pt-2 border border-purple-800 overflow-hidden">
          <p className="p-4">신작:新作</p>
          <div className="w-5/6 border ">
            <SlideMain />
          </div>
        </div>

        {/* 두번째 이미지칸 */}
        <div className="flex flex-col items-center pt-2 border border-purple-800 overflow-hidden">
          <p className="p-4 ">최근 판매된 작품</p>
          <div className="flex border w-screen h-22">
            <ImageSlide className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
