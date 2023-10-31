import React from 'react';
import MobileMain from '../components/mobile/MobilMain';
import Anycom from "../components/Anycom";

function Main() {
  return (
    <div className="flex items-center">
      <div className="flex items-center ">
        {/* 모바일 화면에서만 보임 */}
        <div className="md:hidden lg:hidden text-2xl h-14">
          <MobileMain />
        </div>

        {/* 웹 반응형 600px ~ 1079px) */}
        <div className="hidden md:flex ">웹메인</div>

          <Anycom />

        {/* 웹 반응형 1080px ~ 1920px) */}
        <div className="hidden lg:flex  "></div>
      </div>
    </div>
  );
}

export default Main;
