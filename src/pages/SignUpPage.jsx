import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  });
  const dispatch = useDispatch();

  const isFormValid = () => {
    return (
      formData.userId.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.name.trim() !== '' &&
      formData.email.trim() !== ''
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 회원가입 로직을 처리한 후 유저 정보를 dispatch 합니다.
    // 예: 서버에 회원가입 요청을 보내고 응답을 받은 후 dispatch(loginUser(userInfo))를 호출
    const userInfo = { ...formData }; // 예시로 사용자 정보 생성
    dispatch(loginUser(userInfo));
    console.log('회원가입 정보:', formData);
  };

  const handleCancelClick = () => {
    const isConfirmed = window.confirm('가입을 취소하시겠습니까?');
    if (isConfirmed) {
      // 사용자가 확인을 눌렀을 때 실행할 코드를 여기에 추가
      // 예를 들어, 취소 액션을 수행하거나 이동할 수 있습니다.
    }
  };

  return (
    <div className="bg-black text-black flex justify-center items-center">
      <form className="w-64 p-4 bg-white shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="text-xs">
            아이디
          </label>
          <input
            className="w-full p-2 border border-black shadow-md"
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-xs">
            비밀번호
          </label>
          <input
            className="w-full p-2 border border-black shadow-md"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-xs">
            비밀번호 확인
          </label>
          <input
            className="w-full p-2 border border-black shadow-md"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="text-xs">
            이름
          </label>
          <input
            className="w-full p-2 border border-black shadow-md"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-xs">
            이메일
          </label>
          <input
            className="w-full p-2 border border-black shadow-md"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="text-xs">
            주소
          </label>
          <input
            className="w-full p-2 border border-black shadow-md"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="text-xs">
            번호
          </label>
          <input
            className="w-full p-2 border border-black shadow-md"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="w-full p-2 bg-black text-white mt-4">
          가입하기
        </button>
        <button className="w-full p-2 mt-4 mb-6 bg-black text-white shadow-md" onClick={handleCancelClick}>
          취소하기
        </button>
      </form>
    </div>
  );
}
