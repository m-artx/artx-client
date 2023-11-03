import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // Links
  function links() {
    return (
      <div className="flex justify-center text-sm w-[300px] border ">
        <Link to="/" className="pr-9">
          홈 화면
        </Link>
        <Link to="/art" className="px-9">
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
      <div className="flex-1 text-lg border">
        <div className="ml-20">artx*</div>
      </div>
      <div className="flex-1 flex justify-center items-center h-20 text-sm border">{links()}</div>
      <div className="flex-1 text-sm border">
        <div className="flex justify-end mr-20">
          <Link to="signup">
            <div className="ml-5">회원가입</div>
          </Link>
          <Link to="login">
            <div className="ml-5">로그인</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
