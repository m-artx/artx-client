// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import customAxios from '../../store/customAxios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [message, setMessage] = useState('* 아이디, 비밀번호를 입력해주세요.');

   
    

    const handleLogin = async (e) => {
        e.preventDefault();

        const userRole = '';

        try {
            const response = await customAxios.post('/api/auth/login', { username: username, password: password });
            const userInfo = response.data;

            //디스패치를 통해서 저장소에 접근
            //무엇을 할지를 유저슬라이스에서 세팅한 로그인유저라던지

            console.log('로그인성공');

            // 로그인에 성공해서 userInfo에 accessToken이 있다면
            if (userInfo.accessToken) {
                localStorage.setItem('accessToken',  JSON.stringify(userInfo.accessToken)); //토큰저장
                //닉네임은 상단에서 입력받은 값을 받아와 리덕스로 관리한다
                //리덕스에 유저롤 추가 필요
                

                setMessage('* 로그인 성공!');
                console.log('accessToken:'+ localStorage.getItem('accessToken'));
                console.log('username:'+ localStorage.getItem('username'));
                dispatch(loginUser({ token: userInfo.accessToken, username: username }));

                
            } else {
              console.log('로그인에 성공했으나 엑서스토큰없음');

            }
        } catch (error) {
            console.error('로그인 실패', error);
            setMessage('* 로그인 실패' + error);
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
