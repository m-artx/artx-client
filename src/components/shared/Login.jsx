import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import customAxios from '../../store/customAxios';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from "react-router-dom";

//로그인창 컴포넌트
//로그인과 동시에 accessToken, userId, userRole 정보를 서버에서 수신받아서 리덕스에 저장해준다.


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [message, setMessage] = useState('* 아이디, 비밀번호를 입력해주세요.');
    const navigate = useNavigate;

    //navigate등의 리액트 훅을 이용할때 기능 구성 요소의 최상위 수준(루프, 조건 또는 중첩 함수 내부가 아님)에서만 써야한다. 그러지않으면 에러가남
    const goToPage = (path) => {
        navigate(path);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('핸들로그인내부');

        try {
            //로그인
            const response = await customAxios.post('/api/auth/login', { username, password });
            const userInfo = response.data;
            console.log('userInfo', userInfo);

            console.log('로그인성공');
            // 로그인에 성공해서 userInfo에 accessToken이 있다면
            if (userInfo.accessToken && userInfo.accessToken.value) {
                localStorage.setItem('accessToken', userInfo.accessToken.value);
                localStorage.setItem('username', username);

                setMessage('* 로그인 성공!');
                console.log('accessToken:' + localStorage.getItem('accessToken'));
                console.log('username:' + localStorage.getItem('username'));

                dispatch(
                    loginUser({
                        token: userInfo.accessToken.value,
                        userId: userInfo.userId,
                        userRole: userInfo.userRole,
                    }),

                );
            } else {
                console.log('로그인에 성공했으나 엑서스토큰없음');
            }
        } catch (error) {
            console.error('로그인 실패', error);
            setMessage('* 로그인 실패');
        }
    };

    return (
        <div>
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <div className="border bg-white text-gray-400 text-xs">{message}</div>
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
};

export default Login;
