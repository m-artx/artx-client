// 모바일 상단으로 왼쪽 로고, 우측에 햄버거버튼
// 햄버거 버튼을 누르면 세개의 메뉴가 보인다.

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function MobileHeader() {
  return (
    <div className="flex items-center w-screen justify-between ">
      <Link to="/" className="px-10">
        ARTX
      </Link>
      <div className="flex items-center">
        <Link to="download" className="bg-gray-200 border text-black text-sm p-2 rounded decoration-auto " >DOWNLOAD</Link>
        <FontAwesomeIcon icon={faBars} className="px-10" />
      </div>
    </div>
  );
}

export default MobileHeader;
