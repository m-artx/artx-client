// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import customAxios from '../../store/customAxios';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [message, setMessage] = useState('* 아이디, 비밀번호를 입력해주세요.');

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

                //로컬에 토큰, 유저이름저장

                setMessage('* 로그인 성공!');
                console.log('accessToken:' + localStorage.getItem('accessToken'));
                console.log('username:' + localStorage.getItem('username'));

                // const res = await customAxios.get(`/api/users/${username}`)
                // const userData = res.data;
                // const userRole = userData.userRole;

                dispatch(
                    loginUser({
                        token: userInfo.accessToken.value,
                        userId: userInfo.userId,
                        userRole: userInfo.userRole,
                    })
                );
            } else {
                console.log('로그인에 성공했으나 엑서스토큰없음');
            }
        } catch (error) {
            console.error('로그인 실패', error);
            setMessage('* 로그인 실패' + error);

            if (error.response) {
                // Log the error response status and data
                console.error('Error Response Status:', error.response.status);
                console.error('Error Response Data:', error.response.data);
            } else {
                // Log other error details if available
                console.error('Error Details:', error.message);
            }
            setMessage('* Login failed. Please check the console for more details.');
        }
    };

    const userData = useSelector((state) => state.user);
    console.log(userData);

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
