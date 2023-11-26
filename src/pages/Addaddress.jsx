import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, useNavigate } from 'react-router-dom';


const AddressComponent = ({ updateShippingAddress }) => {
    const [isMounted, setIsMounted] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const loadDaumPostcodeScript = () => {
            const script = document.createElement('script');
            script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {

                // 컴포넌트가 마운트된 상태에서만 이벤트 리스너 추가
                if (isMounted) {
                    document.getElementById('zipcode').addEventListener('click', handleZipcodeClick);
                }

            };
        };

        loadDaumPostcodeScript();

        return () => {

            // 컴포넌트가 언마운트될 때 isMounted 상태 변경
            setIsMounted(false);

            // 컴포넌트가 마운트된 상태에서만 이벤트 리스너 제거
        };
    }, [isMounted]);


    const handleZipcodeClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                document.getElementById('zipcode').value = data.zonecode;
                document.getElementById('address').value = data.address;
            },
        }).open();
    };


    const handleSaveClick = async () => {
        const addressData = {

            name: document.getElementById('name').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            zipcode: document.getElementById('zipcode').value,
            address: document.getElementById('address').value,
            address2: document.querySelector('input[name=address2]').value,

        };

        const accessToken = localStorage.getItem('accessToken');

        try {
            // 주소를 저장하고 배송지를 추가하는 API 호출

            const response = await axios.post(
                `https://ka8d596e67406a.user-app.krampoline.com/api/mypage/addresses`,
                addressData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );


            // API 호출이 성공한 경우, 상위 컴포넌트로 주소 정보를 전달
            updateShippingAddress(addressData);
            // 페이지 이동
        } catch (error) {
            console.error('Error adding shipping address:', error);
        }
        window.location.href = '/mypageaddress';
    };

    return (
        <div className='border-b border-solid mb-10 pb-2'>
            <input className='mr-5' type="text" id="name" placeholder="이름" />
            <input className='mr-5' type="text" id="phoneNumber" placeholder="전화번호" />
            <input className='mr-5' type="text" id="zipcode" placeholder="우편번호" />
            <input className='mr-5' type="text" id="address" placeholder="주소" readOnly />
            <input className='mr-5' type="text" name="address2" placeholder="상세주소" />
            <button onClick={handleSaveClick}>저장하기</button>

        </div>
    );
};

export default AddressComponent;
