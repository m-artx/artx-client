import React from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from './mobile/MobileHeader';

function Header() {
  // Links
  function links() {
    return (
      <div className="flex items-center ">
        <Link to="/" className="px-10">ARTX 소개</Link>
        <Link to="/download" className="px-10">앱 다운로드</Link>
        <Link to="/art" className="px-10">작품보기</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center ">
      {/* 모바일 화면에서만 보임 */}
      <div className="md:hidden flex items-center lg:hidden text-2xl h-[60px] border">
        <MobileHeader />
      </div>

      {/* 웹 반응형 600px ~ 1079px) */}
      <div className="hidden md:flex border justify-evenly h-20 text-2xl">{links()}</div>

      {/* 웹 반응형 1080px ~ 1920px) */}
      <div className="hidden lg:flex  border justify-evenly h-20 text-3xl w-50%">{links()}</div>
    </div>
  );
}

export default Header;
