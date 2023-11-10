import React from 'react';
import { Link } from 'react-router-dom';

export default function ShippingInfo() {
   return (
      <div className="bg-black text-white p-4">
         <Link to="/addaddress" className="mb-4 block">
            <h2 className="bg-white text-black">배송지 추가하기</h2>
         </Link>
         <div>
            <h3 className="mb-2">배송정보</h3>
            <span className="block mb-1">이름</span>
            <span className="block mb-1">전화번호</span>
            <span className="block mb-1">주소</span>
         </div>
      </div>
   );
}
