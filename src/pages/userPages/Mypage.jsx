import React from 'react';
import { Link } from 'react-router-dom';

function MyPage() {
  return (
    <div className="bg-white text-black border border-black p-4  shadow-lg w-screen h-screen ">
      <h1 className="flex justify-center text-5xl bg-white text-black">마이페이지</h1>
      <span className="font-bold flex justify-center text-4x bg-white text-blackl">홍길동 님</span>
      <div className="mb-4 bg-white text-black">
        <Link to="/orderhistory" className="bloc bg-white text-black px-4 py-2 rounded-lg flex justify-center">
          주문/배송 정보
        </Link>
      </div>
      <div>
        <Link to="/member" className=" bg-white text-black px-4 py-2 flex justify-center ">
          개인정보 관리
        </Link>
      </div>
    </div>
  );
}

export default MyPage;
