import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    // 여기에서 로그인 로직을 처리한 후 유저 정보를 dispatch 합니다.
    // 예: 서버에서 로그인 요청을 보내고 응답을 받은 후 dispatch(loginUser(userInfo))를 호출
    const userInfo = { userId, password }; // 예시로 사용자 정보 생성
    dispatch(loginUser(userInfo));
    console.log('사용자 이름:', userId);
    console.log('비밀번호:', password);
  };

  return (
    <div className="flex justify-center items-center h-\ bg-black text-white">
      <form className="w-64 p-4 bg-white shadow-md" onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-black shadow-md text-black"
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
            className="w-full p-2 border border-black shadow-md text-black"
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
        <Link to="signup">
          <button className="w-full p-2 mt-4 mb-6 bg-black text-white shadow-md">회원가입</button>
        </Link>
      </form>
    </div>
  );
}
