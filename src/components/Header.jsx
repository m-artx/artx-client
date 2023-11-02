import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // Links
  function links() {
    return (
      <div className="flex justify-center text-xl w-[300px] border ">
        <Link to="/" className="pr-9">
          홈 화면
        </Link>
        <Link to="/download" className="px-9">
          작품관
        </Link>
        <Link to="/art" className="pl-9">
          FAQ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center h-[140px] border w-screen">
      {/* 웹 반응형 600px ~ 1079px) */}
      <div className="flex-1 text-2xl border" >
        <div className="ml-20">artx</div>
      </div>
      <div className="flex-1 flex justify-center items-center h-20 text-sm border">{links()}</div>
      <div className="flex-1 text-xl border">
        <div className="flex justify-end mr-20">
          <div className="ml-5">회원가입</div>
          <div className="ml-5">로그인</div>
        </div>
      </div>
    
    </div>
  );
}

export default Header;
