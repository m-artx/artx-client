import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// 개인정보관리
// 비밀번호변경
// 주문/배송정보
// 배송지관리
// 고객센터
// 로그아웃

function MyPage() {
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state.user);
    console.log(userInfo);

    const goToPage = (path) => {
        navigate(path);
    };

    return (
      <div className="bg-white text-black shadow-lg w-screen h-screen flex flex-col">
      <h1 className="text-center border text-3xl bg-white text-black">마이페이지</h1>
      <div className="mb-4 bg-white w-[300px] text-black flex flex-col justify-center mx-auto">
          <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('/personal')}>
              개인정보관리
          </button>
          <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('/')}>
              비밀번호 변경
          </button>
          <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('/')}>
              주문/배송정보
          </button>
          <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('/')}>
              배송지관리
          </button>
          <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('/')}>
              고객센터 개인문의
          </button>
          <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('/')}>
              로그아웃
          </button>
          

      </div>
  </div>
    );
}

export default MyPage;
