// ArtistProfilePage.jsx

import React from 'react';

const ArtistProfilePage = () => {
   // 작가 정보를 받아오는 API 호출 등을 추가하세요

   return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
         <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* 작가 정보를 표시하는 부분 */}
            <h2 className="text-3xl font-semibold mb-4 text-center">작가 소개</h2>
            <div className="mb-4">
               {/* 작가 이미지 */}
               <img src="작가이미지URL" alt="작가이름" className="w-full h-64 object-cover rounded" />
            </div>
            <h3 className="text-xl font-semibold mb-2">작가 이름</h3>
            <p className="text-gray-500 mb-4">작가 소개 내용...</p>
            {/* 추가적인 작가 정보 표시 (ex. 작품 수, 전시회 등) */}
         </div>
      </div>
   );
};
  
export default ArtistProfilePage;
