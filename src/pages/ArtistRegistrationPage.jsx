// ArtistRegistrationPage.jsx

import React, { useState } from 'react';

const ArtistRegistrationPage = () => {
   const [formData, setFormData] = useState({
      artistNumber: '', // 기존 작가 번호 필드
      artistName: '',
      artistBio: '',
      artistPhoneNumber: '', // 새로운 휴대폰 번호 필드 추가

      // 추가적인 필드들을 필요에 따라 추가하세요
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      // 작가 등록 API 호출 또는 상태 업데이트 등을 추가하세요
   };

   return (
      <div className="min-h-screen flex items-center justify-center text-white">
         <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-semibold mb-4 text-center">작가 등록</h2>
            <form onSubmit={handleSubmit}>
               <div className="mb-4"></div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작가 이름:</label>
                  <input
                     type="text"
                     name="artistName"
                     value={formData.artistName}
                     onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                     required
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작가 소개:</label>
                  <textarea
                     name="artistBio"
                     value={formData.artistBio}
                     onChange={(e) => setFormData({ ...formData, artistBio: e.target.value })}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                     rows={4}
                     required
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">휴대폰 번호:</label>
                  <input
                     type="number"
                     name="artistPhoneNumber"
                     value={formData.artistPhoneNumber}
                     onChange={(e) => setFormData({ ...formData, artistPhoneNumber: e.target.value })}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                     required
                  />
               </div>
               {/* 추가적인 등록 필드들을 필요에 따라 추가하세요 */}
               <button
                  type="submit"
                  className="border border-white w-full py-2 text-white font-medium rounded transition duration-300 hover:bg-white hover:text-black"
               >
                  작가 등록
               </button>
            </form>
         </div>
      </div>
   );
};

export default ArtistRegistrationPage;
