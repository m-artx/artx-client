import React from 'react';
import { Link } from 'react-router-dom';

import MobileHeader from './mobile/MobileHeader';

function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      {/* 모바일 화면에서만 보임 */}
      <div className="flex sm:hidden">
        <MobileHeader />
      </div>

      {/* 웹 메뉴 부분 (640px 이상의 화면에서만 보임) */}
      <nav className="hidden sm:flex">
        <Link to="/">ARTX 소개</Link>
        <Link to="/download">앱 다운로드</Link>
        <Link to="/art">작품보기</Link>
      </nav>
    </div>
  );
}

export default Header;
