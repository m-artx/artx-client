import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import axios from 'axios';
import customAxios from '../../store/customAxios';

// 아이디와 비번을 입력받는다
// 아이디와 비밀번호 서버에 있는지 확인하고 각각의 값이 일치하는지 확인한다
// 예외처리 1. 없는 아이디는 없는 아이디라고 한다
//        2. 패스워드가 틀린경우 입력을 잘해달라고 한다
// 아이디가 일치하면 서버를 이용(?)하여 알맞은 데이터를 불러온 뒤 화면구성을 변경한다
//       1. 아이디가 관리자/작가/유저중 한사람인지 판단하고 연관된 헤더처리를 해준다.
//          (상단에 유저상태별 메뉴 추가, 장바구니부분 앞에 회원가입,로그인을 지우고 아이디를 띄운다.)

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch(); //디스패치 일단선언(?)

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await customAxios.post('/api/auth/login', { userId, password });
            const userInfo = response.data;
            if (!userInfo) {
                setMessage('아이디가 존재하지 않습니다. 다시한번 확인해주세요.');
                return;
            }
            if (!userInfo.validPassword) {
                setMessage('비밀번호를 다시한번 입력해주세요.');
                return;
            }

            dispatch(loginUser(userInfo));
            console.log('로그인성공');

            //유저 롤에 따라 헤드부분 메뉴 구현
            updateUIBasedOnUserRole(userInfo.role);
        } catch (error) {
            console.error('로그인실패', error);
            setMessage('로그인이 실패하였습니다.');
        }
    };

    const updateUIBasedOnUserRole = (role) => {
        //유저 롤에 따라 헤드부분 메뉴 구현
    };

    return (
        <div className="flex justify-center items-center w-[1300px] p-10">
            <form
                className="w-[300px] p-10 my-4 h-100p-140 bg-white shadow-md flex items-center flex-col h-aut text-black"
                onSubmit={handleLogin}
            >
                <div className="bg-white pb-4 border">
                    <div className="mb-4 text-black bg-white flex items-center">
                        <div className="bg-white w-14">아이디</div>
                        <input
                            className="p-2 bg-white border focus:outline-none h-8 w-[160px]"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 text-black bg-white flex items-center">
                        <div className="bg-white w-14">비밀번호</div>
                        <input
                            className="p-2 bg-white border focus:outline-none h-8 w-[160px]"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-black text-white font-bold py-2 px-4 w-[150px] rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                >
                    로그인
                </button>
            </form>
        </div>
    );
}
