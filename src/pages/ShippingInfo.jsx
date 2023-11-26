import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


export default function ShippingInfo() {
    const [storedAddressInfo, setStoredAddressInfo] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                // API 호출
                const response = await axios.get(
                    `https://ka8d596e67406a.user-app.krampoline.com/api/mypage/addresses`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        addressId: 0,
                    }
                );

                // API 응답에서 주소 정보 추출
                const addressInfo = response.data;

                // 주소 정보를 상태에 설정
                setStoredAddressInfo(addressInfo);
            } catch (error) {
                console.error('Error fetching address info:', error);
            }
        };

        // fetchData 함수 호출
        fetchData();
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
                //  params: {
                //      addressId: addressId,
                //  },
            });

            // 주소 삭제 후, 상태 업데이트
            setStoredAddressInfo((prevInfo) => ({
                ...prevInfo,
                addresses: prevInfo.addresses.filter((address) => address.addressId !== addressId),
            }));
        } catch (error) {
            console.error('주소를 삭제하는 중 에러 발생:', error);
        }
    };
    // 주소 목록을 렌더링하는 함수
    const renderAddressList = () => {
        if (storedAddressInfo && storedAddressInfo.addresses && storedAddressInfo.addresses.length > 0) {
            return (
                <div className='w-screen pl-10 pr-10'>
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
        <div className=" pl-10 pr-10  text-white p-4">
            <Link to="/addaddress" className="mb-4 block">
                <h2 style={{textAlign: 'center'}} className="text-white pb-4 border-b border-solid hover:bg-white-100">배송지 추가하기</h2>
            </Link>

            {renderAddressList()} {/* 주소 목록을 렌더링하는 함수 호출 */}
        </div>
    );
}
