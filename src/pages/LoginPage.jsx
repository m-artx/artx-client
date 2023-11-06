import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';
import axios from 'axios'; // Axios 라이브러리를 임포트

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    // 사용자 정보를 서버로 전송
    axios
      .post('여기에 API 엔드포인트 URL', { userId, password }) // 실제 API 엔드포인트 URL로 변경해야 합니다.
      .then((response) => {
        // 서버로부터 응답을 받으면 사용자 정보를 업데이트
        const userInfo = response.data; // 응답에서 사용자 정보 추출 (예: response.data 또는 다른 필드에 따라 다를 수 있음)
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
        <div className="mb-4">
          <input
            className="w-full p-2 border bg-white border-black shadow-md"
            type="text"
            id="username"
            name="username"
            placeholder="이메일 주소"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border bg-white border-black shadow-md text-black"
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
