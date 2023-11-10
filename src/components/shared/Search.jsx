import React from 'react';

function Search() {
   return (
      <div className="flex justify-center items-center  border">
         <div>
            <input
               className="border rounded-full bg-black w-[320px] p-3 text-center placeholder-white "
               type="text"
               placeholder="검색어를 입력해주세요. 예) 작가명, 작품명"
            ></input>
         </div>
      </div>
   );
}

export default Search;
