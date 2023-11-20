import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import instance from '../../instance/instance';

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
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태

    const goToPage = (path) => {
        //슬래시를 넣으면 절대경로가 됨, mypage/personal이 아니라 바로 personal로 연결은 아래처럼
        navigate('/' + path);
    };

    useEffect(() => {
        instance
            .get(`/api/users/${userInfo.username}`)
            .then((response) => {
                setUserData(response.data); //api로부터 사용자 정보를 받아온다
            })
            .catch((error) => {
                console.error('유저인포에러', error);
                if (error.response && (error.response.state === 401 || error.response.state === 403)) {
                    navigate('/login');
                }
            });
    }, [navigate]);

    return (
        <div className="bg-white text-black shadow-lg w-screen h-screen flex flex-col">
            <h1 className="text-center border text-3xl bg-white text-black">마이페이지</h1>
            <div className="bg-white text-black text-center">{`'${userInfo.username} 님'`}</div>
            <div className="mb-4 bg-white w-[300px] text-black flex flex-col justify-center mx-auto">
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('personal')}>
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
