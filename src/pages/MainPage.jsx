import React from 'react';
import ImageSlide from '../components/ImageSlide';
import SlideMain from '../components/SlideMain';
import SlideSecond from "../components/SlideSecond";
// import ApiLoader from '../instance/ApiLoader';

function MainPage() {
  // return 값이 data이다
  // const data = ApiLoader();

  return (
    <div className="flex-1 flex flex-col items-center border border-red-800 max-w-[1300px] ">
      {/* 인풋 */}
      <input
        className="flex border rounded-full bg-black w-[320px] p-2 text-center placeholder-white "
        type="text"
        placeholder="검색어를 입력해주세요. 예) 작가명, 작품명"
      ></input>
      <div className="flex-1 flex flex-col w-[100%] ">
        <div className="flex-1 border  bg-slate-400 pt-2 flex flex-col items-center overflow-hidden">
          <p className="p-3">인기작가:新作</p>
          <div className="w-[80%] flex-1 ">
            <SlideMain />
          </div>
        </div>
        <div className="flex-1 border  bg-slate-400 pt-2 flex flex-col items-center overflow-hidden">
          <p className="p-3">주목할만한:作</p>
          <div className="w-[80%] flex-1 ">
            <SlideSecond />
            
          </div>
        </div>
      </div>
      {/* 메인슬라이드1, 2 */}
      {/* <div className="items-center border border-yellow-400 bg-gray-900 grid grid-rows-2 ">
        <div className="flex flex-col items-center pt-2 border border-blue-800 overflow-hidden">
          <p className="p-3">인기작가:新作</p>
          <div className="w-5/6 border ">
            <SlideMain />
          </div>
        </div>

        <div className="flex flex-col items-center pt-2  bg-gray-500 border-purple-800 overflow-hidden">
          <p className="p-3 ">주목할만한:作</p>
          <div className="w-5/6 ">
            <ImageSlide />
          </div>
        </div>
      </div> */}

      {/* 범주 슬라이드 */}
      {/* <div className="flex flex-col items-center pt-2 border yellow-purple-800 overflow-hidden h-[400px]">
        <p className="p-4 ">범주</p>
        <div className="flex border w-screen flex-grow">
          <ImageSlide className="" />
        </div>
      </div> */}
    </div>
  );
}

export default MainPage;
