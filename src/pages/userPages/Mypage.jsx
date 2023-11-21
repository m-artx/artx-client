import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import instance from '../../instance/instance';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/userSlice';

// 개인정보관리
// 비밀번호변경
// 주문/배송정보
// 배송지관리
// 고객센터 :
// 로그아웃 : 완료

function MyPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogin, userRole } = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태
    const localUsername = localStorage.getItem('username');

    console.log(isLogin, userRole);


    const goToPage = (path) => {
        //슬래시를 넣으면 절대경로가 됨, mypage/personal이 아니라 바로 personal로 연결은 아래처럼
        navigate('/' + path);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <div className="bg-white text-black shadow-lg w-[1000px] pb-20 flex flex-col">
            <h1 className="text-center border text-3xl bg-white text-black">마이페이지</h1>
            <div className="bg-white text-black text-center">{`'${localUsername} 님'`}</div>
            <div className="mb-4 bg-white w-[300px] text-black flex flex-col justify-center mx-auto">
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('personalinfo')}>
                    개인정보관리
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('/')}>
                    비밀번호 변경
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('orderhistory')}>
                    주문/배송정보
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('addaddress')}>
                    배송지관리
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('porsonalQA')}>
                    고객센터 개인문의
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => handleLogout()}>
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default MyPage;
