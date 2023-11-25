import React, { useState, useEffect } from 'react';
import MoModal from '../../components/shared/MoModal';
import MyPageDataFetcher from '../../components/shared/MyPageDataFetcher';
import customAxios from '../../store/customAxios';

//추가하면좋을것 : setTryMessage 이메일정보 부분가림 

const PasswordChangerModal = ({ isOpen, onClose }) => {
    const [newPassword, setNewPassword] = useState('');
    const [userData, setUserData] = useState({});
    const [tryMessage, setTryMessage] = useState(`고객님의 메일로 비밀번호 변경 메일을 발송합니다`);
    const [finishMessage, setFinishMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await MyPageDataFetcher();
                if (data) {
                    setUserData(data);
                    console.log('userData잘받아와짐', data);
                }
            } catch (error) {
                console.error('유저데이터패치실패', error);
            }
        };
        fetchData();
    }, []);

    //메일발송 누르면 작동하는 함수
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        console.log('메일발송 클릭됨');

        try {
            const email = userData.userEmail;
            const username = userData.username;
            const response = await customAxios.post('/api/users/init-password', { email, username });
            if (response) {
                // console.log('비밀번호변경완료');
                // console.log('메일체크', userData.userEmail);

                setTryMessage('');
                setFinishMessage(
                    ` 고객님의 이메일(${userData.userEmail})로 이메일 발송이 완료되었습니다. 메일 확인 후 다시 로그인 해주세요`
                );
                //로그아웃처리 후 로그인화면으로 가기
            } else {
            }
        } catch (error) {
            console.error('비밀번호 초기화 실패', error);
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
                <p className="bg-white text-lg py-2 font-semibold">비밀번호 초기화</p>
                <p className="bg-white text-sm pt-3 w-[440px] text-red-400 ">{finishMessage}</p>

                <p className="bg-white text-sm ">{tryMessage}</p>
                <div className="bg-white">
                    <button className="border text-blue-500 py-2 px-4 mt-6 rounded m-3" onClick={handlePasswordChange}>
                        메일발송
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        취소하기
                    </button>
                </div>
                <p className="bg-white text-xs text-gray-400 ">* 이메일 변경을 원하시면 개인정보를 수정하여 주세요</p>
            </div>
        </MoModal>
    );
};

export default PasswordChangerModal;
