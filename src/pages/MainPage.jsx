import React from 'react';
import ImageSlide from '../components/ImageSlide';
import SlideMain from '../components/SlideMain';
import SlideSecond from '../components/SlideSecond';
import CategorySlider from '../components/CategorySlider';
import ApiLoader from '../instance/ApiLoader';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Slider from 'react-slick';
import Search from '../components/shared/Search';

function MainPage() {
  // return 값이 data이다
  // const data = ApiLoader();

  return (
    <div className="flex items-center flex-col border max-w-[1300px]">
      {/* 인풋 */}
      <div className="flex flex-col items-center justify-center border border-blue-700 max-w-[1300px] h-[1000px]">
        <div className="h-[100px]">
          <Search />
        </div>
        {/* 슬라이드두개감쌈 */}
        <div className="flex flex-col w-[100%] h-screen ">
          <div className=" flex-1 border  bg-slate-400 pt-2 flex flex-col items-center overflow-hidden">
            <p className="p-3">인기작가:新作</p>
            <div className="w-[80%] flex-1 ">
              {/* 인기작가 제품 10개 */}
              <SlideMain />
            </div>
          </div>
          <div className="flex-1 border  bg-slate-400 pt-2 flex flex-col items-center overflow-hidden">
            <p className="p-3">주목할만한:作</p>
            <div className="w-[80%] flex-1 ">
              {/* 신규둥록작품 10개 */}
              <SlideSecond />
            </div>
          </div>
        </div>
      </div>

      {/* 범주 슬라이드 */}
      <div className="w-full">
        <div className="flex flex-col w-full items-center pt-2 border  yellow-purple-800 overflow-hidden h-[400px]">
          <p className="p-3">둘러보기</p>
          <div className="flex border w-screen justify-center ">
            <CategorySlider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
{
  /* 메인슬라이드1, 2 */
}
{
  /* <div className="items-center border border-yellow-400 bg-gray-900 grid grid-rows-2 ">
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
      </div> */
}
