import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/userSlice';
import MoModal from '../../components/shared/MoModal';
import PasswordChangerModal from '../myPages/PasswordChangerModal';
import SignOutModal from '../myPages/SignOutModal';


// 페이지 구조

// 개인정보관리 : 페이지로 연결. 변경버튼 활성화 빼고는 제작됨
// 비밀번호변경 : 모달창 완료.
// 주문/배송정보 : 더미구현 완료
// 배송지관리 : 모달창 예정
// 고객센터 : 더미구현.. 재영님 요청중 게시글 클릭 api등.. 와이어프레임 7번페이지 참고해서 레이아웃잡기
//  로그아웃 : 완료
// 회원탈퇴 : 모달창 예정

function MyPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogin, userRole } = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태
    const localUsername = localStorage.getItem('username');
    console.log(isLogin, userRole);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);


    //모달 오픈클로즈 함수를 하나로 쓰면 한 버튼을 클릭하면 두개가 다 열린다.
    //패스워드초기화 모달
    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };
    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };
    //회원탈퇴 모달
    const openSignOutModal = () => {
        setIsSignOutModalOpen(true);
    };
    const closeSignOutModal = () => {
        setIsSignOutModalOpen(false);
    };


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
    <div className="bg-white text-black shadow-lg w-[1300px] pb-20 flex flex-col">
            <h1 className="text-center border text-3xl bg-white text-black">마이페이지</h1>
            <div className="bg-white text-black text-center">{`'${localUsername} 님'`}</div>
            <div className="mb-4 bg-white w-[300px] text-black flex flex-col justify-center mx-auto">
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('personalinfo')}>
                    개인정보관리
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={openPasswordModal}>
                    비밀번호 변경
                </button>
                {isPasswordModalOpen && <PasswordChangerModal className="w-1/2" isOpen={isPasswordModalOpen} onClose={() => closePasswordModal(false)} />}

                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('orderhistory')}>
                    주문/배송정보
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('mypageaddress')}>
                    배송지관리
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => goToPage('porsonalQA')}>
                    고객센터 개인문의
                </button>
                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => handleLogout()}>
                    로그아웃
                </button>

                <button className=" bg-white text-black py-2 mt-4 border" onClick={openSignOutModal}>
                    회원탈퇴
                </button>
                {isSignOutModalOpen && <SignOutModal isOpen={openSignOutModal} onClose={() => closeSignOutModal(false)} />}
            </div>
        </div>
    );
}

export default MyPage;
