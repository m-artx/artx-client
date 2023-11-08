// ArtSearch.js

import React, { useState } from 'react';

const ArtSearch = ({ onSearch }) => {
   const [searchTerm, setSearchTerm] = useState('');

   const handleSearch = () => {
      // 부모 컴포넌트로 검색어 전달
      onSearch(searchTerm);
   };

   return (
      <div className="max-w-2xl mx-auto flex p-4 bg-white">
         <input
            type="text"
            placeholder="작품을 검색하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow w-full px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
         />
         <button
            onClick={handleSearch}
            className="ml-4 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none"
         >
            검색
         </button>
      </div>
   );
};

export default ArtSearch;
