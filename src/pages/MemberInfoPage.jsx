import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MemberInfoPage() {
  const navigate = useNavigate(); // useHistory 훅을 사용하여 history 객체를 가져옵니다.

  const [memberInfo, setMemberInfo] = useState({
    name: ' 이름',
    email: ' 이메일',
    id: ' 아이디',
    address: '주소',
    number: ' 번호',
    // 다른 회원 정보 필드들을 추가할 수 있습니다.
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo({
      ...memberInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 서버로 수정된 회원 정보를 보내는 API 호출을 할 수 있습니다.
    // 서버에서 데이터베이스를 업데이트하고, 성공적으로 업데이트되었음을 사용자에게 피드백으로 보여줄 수 있습니다.

    // 변경 사항을 저장했음을 알리는 알림창 띄우기
    window.alert('변경사항이 저장되었습니다.');

    // 페이지 이동
    navigate('/mypage'); // 원하는 경로로 이동합니다.
  };

  return (
    <div className="bg-white min-h-screen py-8 w-screen">
      <div className="max-w-md mx-auto bg-gray-100 p-4 rounded-lg shadow-lg">
        <h1 className="flex justify-center text-5xl  text-black">마이페이지</h1>
        <span className="font-bold flex justify-center text-4x  text-blackl">홍길동 님</span>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm text-gray-600">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={memberInfo.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-gray-600">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={memberInfo.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="text-sm text-gray-600">
              아이디
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={memberInfo.id}
              onChange={handleInputChange}
              className="w-full p-2 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="text-sm text-gray-600">
              주소
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={memberInfo.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="text-sm text-gray-600">
              번호
            </label>
            <input
              type="text"
              id="number"
              name="number"
              value={memberInfo.number}
              onChange={handleInputChange}
              className="w-full p-2 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>
          <button type="submit" className=" bg-black text-white font-semibold py-2 px-4 rounded-md  focus:outline-none">
            저장
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemberInfoPage;
