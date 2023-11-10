import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      userId: '', //유효성 필
      password: '', //유효성 필
      confirmPassword: '',
      name: '',
      nickName: '',
      email: '', //유효성 필
      phoneNumber: '',
      address: '',
   });
   const [passwordError, setPasswordError] = useState('');
   const [emailError, setEmailError] = useState('');
   const dispatch = useDispatch();

   // 아이디 유효성 검사 함수
   const isUserIdValid = (userId) => {
      // 아이디 유효성 검사 로직을 추가하세요.
      // 예를 들어, 아이디가 4자 이상이어야 하고 특수 문자를 포함하지 않아야 할 경우:
      // return userId.length >= 4 && !/[!@#$%^&*(),.?":{}|<>]/g.test(userId);
      return true; // 예시로 true를 반환하도록 해두었습니다.
   };

   // 이메일 유효성 검사 함수
   const isEmailValid = (email) => {
      // 이메일 유효성 검사 로직을 추가하세요.
      // 예를 들어, 이메일이 이메일 주소 형식에 맞아야 하는 경우:
      // return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
      return true; // 예시로 true를 반환하도록 해두었습니다.
   };

   //전체 데이터가 채워져 있어야 회원가입을 할수있게 한다
   //아이디, 비밀번호, 이메일 유효성체크
   const isFormValid = () => {
      return (
         isUserIdValid(formData.userId) && // 아이디 유효성 검사 추가
         formData.password.trim() !== '' &&
         formData.name.trim() !== '' &&
         isEmailValid(formData.email) && // 이메일 유효성 검사 추가
         formData.password === formData.confirmPassword &&
         passwordError === ''
      );
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });

      // 비밀번호 유효성 검사 정규표현식
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/;

      // 비밀번호 검사
      if (name === 'password') {
         if (!passwordRegex.test(value)) {
            setPasswordError('영문, 숫자, 특수문자를 포함하여 8~30자로 입력하세요.');
         } else {
            setPasswordError('');
         }
      }

      // 비밀번호 확인 검사
      if (name === 'confirmPassword' && formData.password !== value) {
         setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
         setPasswordError('');
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      // 유효성 검사 추가
      if (!isFormValid()) {
         console.error('입력이 유효하지 않습니다.');
         return;
      }

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
         navigate('/');
      }
   };

   return (
      <div className="bg-white text-black flex justify-center items-center">
         <form className="w-64 p-4 bg-white shadow-md text-black" onSubmit={handleSubmit}>
            <div className="mb-4 bg bg-white">
               <label htmlFor="userId" className="text-xs bg-white text-black">
                  아이디
               </label>
               <input
                  className={`w-full p-2 border ${
                     isUserIdValid(formData.userId) ? 'border-black' : 'border-red-500'
                  } shadow-md bg-white`}
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
               />
               {!isUserIdValid(formData.userId) && (
                  <p className="text-red-500 text-xs mt-1">아이디가 유효하지 않습니다.</p>
               )}
            </div>
            <div className="mb-4 bg-white">
               <label htmlFor="password" className="text-xs bg-white text-black">
                  비밀번호
               </label>
               <input
                  className={`w-full p-2 border ${
                     passwordError ? 'border-red-500' : 'border-black'
                  } shadow-md bg-white`}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="영문, 숫자, 특수문자 8-30자"
                  value={formData.password}
                  onChange={handleChange}
                  required
               />
               {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>
            <div className="mb-4 bg-white">
               <label htmlFor="confirmPassword" className="text-xs bg-white text-black">
                  비밀번호 확인
               </label>
               <input
                  className={`w-full p-2 border ${
                     passwordError ? 'border-red-500' : 'border-black'
                  } shadow-md bg-white`}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
               />
            </div>
            <div className="mb-4 bg-white">
               <label htmlFor="name" className="text-xs bg-white text-black">
                  이름
               </label>
               <input
                  className="w-full p-2 border border-black shadow-md bg-white"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
               />
            </div>
            <div className="mb-4 bg-white">
               <label htmlFor="nickName" className="text-xs bg-white text-black">
                  닉네임
               </label>
               <input
                  className="w-full p-2 border border-black shadow-md bg-white"
                  type="text"
                  id="nickName"
                  name="nickName"
                  value={formData.nickName}
                  onChange={handleChange}
                  required
               />
            </div>
            <div className="mb-4 bg-white">
               <label htmlFor="email" className="text-xs bg-white text-black">
                  이메일
               </label>
               <input
                  className={`w-full p-2 border ${
                     isEmailValid(formData.email) ? 'border-black' : 'border-red-500'
                  } shadow-md bg-white`}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
               />
               {!isEmailValid(formData.email) && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            <div className="mb-4 bg-white">
               <label htmlFor="phoneNumber" className="text-xs bg-white text-black">
                  번호
               </label>
               <input
                  className="w-full p-2 border border-black shadow-md bg-white"
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
               />
            </div>
            <div className="mb-4 bg-white">
               <label htmlFor="address" className="text-xs bg-white text-black">
                  주소
               </label>
               <input
                  className="w-full p-2 border border-black shadow-md bg-white"
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
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
