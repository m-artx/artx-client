import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/userSlice';
import MoModal from '../../components/shared/MoModal';
import PasswordChanger from '../myPages/PasswordChanger'
//이거왜안불러와지는거야
// import NewPassword  from '../../components/logics/NewPassword';


// 개인정보관리 : 변경버튼 활성화 빼고는 제작됨
// 비밀번호변경 : 모달창 예정
//  주문/배송정보 : 더미구현 완료
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

    //모달핸들러
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
        console.log('모달열기');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        console.log('모달닫기');
    };

    //비밀번호 초기화 함수


    
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
                <button className=" bg-white text-black py-2 mt-4 border" onClick={openModal}>
                    비밀번호 변경
                </button>
                {isModalOpen && (
                    <MoModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        className="modal w-1/2" // Add a custom class for the modal container
                        overlayClassName="modal-overlay" // Add a custom class for the modal overlay
                        contentLabel="Change Password Modal"
                    >
                        <div className="bg-white">
                            <div className="bg-white">새로 사용할 비밀번호를 입력해주세요.</div>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded mb-4 bg-white"
                                placeholder="New Password"
                            />

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  ">
                                비밀번호 변경
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  "
                            >
                            </button>
                        </div>
                    </MoModal>
                )}

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

                <button className=" bg-white text-black py-2 mt-4 border" onClick={() => handleLogout()}>
                    회원탈퇴
                </button>
            </div>
        </div>
    );
}

export default MyPage;
