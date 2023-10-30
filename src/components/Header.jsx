import React from 'react';
import { Link } from 'react-router-dom';

import MobileHeader from './mobile/MobileHeader';

function Header() {
  // 링크 따로 빼놓음
  function links() {
    return (
      <div className="flex items-center ">
        <Link to="/" className="px-10">
          ARTX 소개
        </Link>
        <Link to="/download" className="px-10">
          앱 다운로드
        </Link>
        <Link to="/art" className="px-10">
          작품보기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center ">
      {/* 모바일 화면에서만 보임 */}
      <div className="md:hidden flex items-center lg:hidden text-lg h-14 border">
        <MobileHeader />
      </div>

      {/* 웹 반응형 md 600px ~ 1079px) */}
      {/* 웹 반응형 lg 1080px ~ 1920px) */}
      <div className="hidden md:flex lg:flex  border w-screen justify-evenly text-md h-20">{links()}</div>
    </div>
  );
}

export default Header;
