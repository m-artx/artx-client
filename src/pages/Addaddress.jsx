import React, { useEffect } from 'react';

const AddressComponent = () => {
    useEffect(() => {
        const loadDaumPostcodeScript = () => {
            const script = document.createElement('script');
            script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                document.getElementById('zipcode').addEventListener('click', handleZipcodeClick);
            };
        };

        loadDaumPostcodeScript();

        return () => {
            document.getElementById('zipcode').removeEventListener('click', handleZipcodeClick);
        };
    }, []);

    const handleZipcodeClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                document.getElementById('zipcode').value = data.zonecode;
                document.getElementById('address').value = data.address;
            },
        }).open();
    };

    const handleSaveClick = () => {
        // 주소 정보를 로컬 스토리지에 저장
        const addressInfo = {
            name: document.getElementById('name').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            zipcode: document.getElementById('zipcode').value,
            address: document.getElementById('address').value,
            address2: document.querySelector('input[name=address2]').value,
        };

        localStorage.setItem('addressInfo', JSON.stringify(addressInfo));
        // 추가되었습니다라는 알림 창 표시
        window.alert('주소가 추가되었습니다');
        window.location.href = '/shippinginfo'; // 여기에 이동하고 싶은 경로를 적
        console.log(addressInfo);
    };

    return (
        <div>
            <input type="text" id="name" placeholder="이름" />
            <input type="text" id="phoneNumber" placeholder="전화번호" />
            <input type="text" id="zipcode" placeholder="우편번호" />
            <input type="text" id="address" placeholder="주소" readOnly />
            <input type="text" name="address2" placeholder="상세주소" />
            <button onClick={handleSaveClick}>추가하기</button>
        </div>
    );
};

export default AddressComponent;
