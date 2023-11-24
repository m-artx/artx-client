import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Addaddress 컴포넌트를 import 하지 않음

export default function ShippingInfo() {
    const [storedAddressInfo, setStoredAddressInfo] = useState(null);

    useEffect(() => {
        // 로컬 스토리지에서 addressInfo를 가져옴
        const storedData = localStorage.getItem('addressInfo');

        // 가져온 데이터가 있다면 파싱하여 state에 설정
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setStoredAddressInfo(parsedData);
        }

        // 페이지 로드 시 자동으로 주소 정보 표시
        displayAddressInfo();
    }, []); // 빈 의존성 배열로 한 번만 실행되도록 설정

    // storedAddressInfo를 사용하여 원하는 작업 수행
    const displayAddressInfo = () => {
        if (storedAddressInfo) {
            return (
                <div>
                    <p>이름: {storedAddressInfo.name}</p>
                    <p>전화번호: {storedAddressInfo.phoneNumber}</p>
                    <p>우편번호: {storedAddressInfo.zipcode}</p>
                    <p>주소: {storedAddressInfo.address}</p>
                    <p>상세주소: {storedAddressInfo.address2}</p>
                </div>
            );
        } else {
            return <p>저장된 주소 정보가 없습니다.</p>;
        }
    };

    return (
        <div className="bg-black text-white p-4">
            <Link to="/addaddress" className="mb-4 block">
                <h2 className="bg-white text-black">배송지 추가하기</h2>
            </Link>
            <div>
                <h3 className="mb-2">배송정보</h3>
                {displayAddressInfo()} {/* 주소 정보를 렌더링하는 함수 호출 */}
            </div>
        </div>
    );
}
