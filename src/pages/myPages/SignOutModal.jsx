import React, { useState, useEffect } from 'react';
import MoModal from '../../components/shared/MoModal';
import MyPageDataFetcher from '../../components/shared/MyPageDataFetcher';
import customAxios from '../../store/customAxios';

//회원탈퇴!

// 비밀번호를 입력받는다
// 확인을 누르면 aboutToSignOut 실행
const SignOutModal = ({ isOpen, onClose }) => {
    console.log();
    const [passwordForSignOut, setPasswordForSignOut] = useState('');

    const handleSignOut = () => {
        let signOutConfirm = window.confirm('확인을 누르면 회원가입 정보가 사라집니다. 정말로 탈퇴하시겠습니까?');
        if (signOutConfirm) {
            console.log('회원탈퇴 실행됨');
            //회원탈퇴 실행 기능
            //메인으로 돌아가기 또는 리덕스 로그아웃?
        } else {
            alert('회원 탈퇴가 취소되었습니다.');
        }
    };

    return (
        <MoModal
            isOpen={isOpen}
            onClose={onClose}
            className="" // Add a custom class for the modal container
            overlayClassName="modal-overlay" // Add a custom class for the modal overlay
            contentLabel="Change Password Modal"
        >
            <div className="w-auto border bg-white p-4 flex  items-center flex-col">
                <p className="bg-white text-lg py-2 font-semibold">회원탈퇴</p>
                <p className="bg-white text-sm ">비밀번호를 입력 후 하단의 탈퇴 버튼을 눌러주세요.</p>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호 입력란"
                        className="bg-white w-[150px] focus:outline-none px-4 border-2 placeholder:text-xs placeholder:text-gray-400 text-center"
                    />
                </div>
                <div className="bg-white">
                    <button className="border text-blue-500 py-2 px-4 mt-6 rounded m-3" onClick={handleSignOut}>
                        회원탈퇴
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        취소하기
                    </button>
                </div>
                <p className="bg-white text-xs text-gray-400 ">* 탈퇴 후에는 모든 개인정보가 식제됩니다.</p>
            </div>
        </MoModal>
    );
};

export default SignOutModal;
