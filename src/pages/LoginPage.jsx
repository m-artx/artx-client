import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';
import axios from 'axios';

export default function LoginPage() {
   const [userId, setUserId] = useState('');
   const [password, setPassword] = useState('');
   const [passwordError, setPasswordError] = useState('');

   const dispatch = useDispatch();

   const handleLogin = (e) => {
      e.preventDefault();

      // 비밀번호 유효성 검사 정규표현식
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/;

      // 비밀번호 유효성 검사
      if (!passwordRegex.test(password)) {
         setPasswordError('비밀번호를 정확히 입력해주세요.');
         return;
      }

      // 사용자 정보를 서버로 전송
      axios
         .post('여기에 API 엔드포인트 URL', { userId, password })
         .then((response) => {
            const userInfo = response.data;
            dispatch(loginUser(userInfo));
            console.log('로그인 성공');
         })
         .catch((error) => {
            console.error('로그인 실패', error);
         });
   };

   return (
      <div className="flex justify-center items-center">
         <form className="w-64 p-4 bg-white shadow-md" onSubmit={handleLogin}>
            <div className="mb-4 text-black">
               <input
                  className="w-full p-2 border bg-white border-black shadow-md"
                  type="email"
                  id="username"
                  name="username"
                  placeholder="이메일 주소"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
               />
            </div>
            <div className="mb-4">
               <input
                  className={`w-full p-2 border ${'bg-white border-black text-black'} shadow-md text-black`}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="영문,숫자,특수문자 8-30자"
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value);
                     setPasswordError('');
                  }}
               />
               {passwordError && <p className="text-red-500 text-sm mt-1 bg-white ">{passwordError}</p>}
            </div>
            <button type="submit" className="w-full p-2 bg-black text-white mt-4">
               로그인
            </button>
            <Link to="/signup">
               <button className="w-full p-2 mt-4 mb-6 bg-black text-white shadow-md">회원가입</button>
            </Link>
         </form>
      </div>
   );
}
