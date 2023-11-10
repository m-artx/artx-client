import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddAddress() {
   const [address, setAddress] = useState('');

   const handleSearch = () => {
      // TODO: 카카오 맵 API를 사용하여 주소 검색
      // API 호출 및 결과를 처리하는 로직을 작성하세요.
   };
   const handleAddComplete = () => {
      console.log('주소 추가 완료');
   };
   return (
      <div>
         <div>
            <button onClick={handleSearch}>주소 검색</button>
         </div>
         <div>
            <input type="text" placeholder="우편 번호" value={address} onChange={(e) => setAddress(e.target.value)} />
         </div>
         <div>
            <input type="text" placeholder="상세 주소 입력" />
         </div>
         <div>
            <input type="text" placeholder="수령인" />
         </div>
         <div>
            <input type="text" placeholder="휴대폰 번호" />
         </div>
         <button onClick={handleAddComplete}>추가 완료</button>
      </div>
   );
}
