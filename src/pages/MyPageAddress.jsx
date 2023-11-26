import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function MyPageAddress() {
    const [storedAddressInfo, setStoredAddressInfo] = useState(null);

    // 주소 목록을 불러오는 함수
    const fetchAddressInfo = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            // API 호출
            const response = await axios.get(`https://ka8d596e67406a.user-app.krampoline.com/api/mypage/addresses`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                addressId: 0,
            });

            // API 응답에서 주소 정보 추출
            const addressInfo = response.data;

            // 주소 정보를 상태에 설정
            setStoredAddressInfo(addressInfo);
        } catch (error) {
            console.error('Error fetching address info:', error);
        }
    };

    useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 주소 목록을 불러옴
        fetchAddressInfo();
    }, []); // 빈 의존성 배열로 한 번만 실행되도록 설정

    // 주소 삭제 함수
    const deleteAddress = async (addressId) => {
        const accessToken = localStorage.getItem('accessToken');
        const params = { addressId };
        console.log(accessToken, '토큰');
        console.log(addressId, '12', params);
        try {
            // API 호출
            await axios.delete(`https://ka8d596e67406a.user-app.krampoline.com/api/mypage/addresses/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            // 주소 삭제 후, 주소 목록 다시 불러오기
            fetchAddressInfo();
        } catch (error) {
            console.error('주소를 삭제하는 중 에러 발생:', error);
        }
    };

    // 주소 목록을 렌더링하는 함수
    const renderAddressList = () => {
        if (storedAddressInfo && storedAddressInfo.addresses && storedAddressInfo.addresses.length > 0) {
            return (
                <div>
                    <h3 className="mb-2">배송지 목록</h3>
                    <ul>
                        {storedAddressInfo.addresses.map((address) => (
                            <li key={address.addressId}>
                                <p>주소: {address.address}</p>
                                <p>상세주소: {address.addressDetail}</p>
                                <button onClick={() => deleteAddress(address.addressId)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </li>
                        ))}
                    </ul>
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
            {renderAddressList()} {/* 주소 목록을 렌더링하는 함수 호출 */}
        </div>
    );
}
