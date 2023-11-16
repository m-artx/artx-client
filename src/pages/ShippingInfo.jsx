import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Addaddress from '../pages/Addaddress'; // 파일 경로에 따라 수정

export default function ShippingInfo() {
    // AddressComponent에서 사용할 상태와 함수를 정의
    const [shippingAddress, setShippingAddress] = useState({
        name: '', // 이름 추가
        phone: '', // 전화번호 추가
        zipcode: '',
        address: '',
        address2: '',
    });

    const updateShippingAddress = (newAddress) => {
        setShippingAddress(newAddress);
    };

    return (
        <div className="bg-black text-white p-4">
            <Link to="/addaddress" className="mb-4 block">
                <h2 className="bg-white text-black">배송지 추가하기</h2>
            </Link>
            <div>
                <h3 className="mb-2">배송정보</h3>
                {/* <input
               type="text"
               placeholder="이름"
               value={shippingAddress.name}
               onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
            />
            <input
               type="text"
               placeholder="전화번호"
               value={shippingAddress.phone}
               onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
            /> */}
                <span className="block mb-1">
                    {shippingAddress.address} {shippingAddress.address2}
                </span>
            </div>

            {/* AddressComponent를 사용하면서 updateShippingAddress 함수를 props로 전달 */}
            <Addaddress updateShippingAddress={updateShippingAddress} />
        </div>
    );
}
