import React, { useEffect, useState } from 'react';

const AddressComponent = ({ updateShippingAddress }) => {
    const [addressForm, setAddressForm] = useState({
        name: '',
        phoneNumber: '',
        zipcode: '',
        address: '',
        address2: '',
    });
    useEffect(() => {
        const savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
        if (savedAddress) {
            setAddressForm(savedAddress);
        }
    }, []);
    useEffect(() => {
        const loadDaumPostcodeScript = () => {
            const script = document.createElement('script');
            script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            document.head.appendChild(script);
            const oddressForm = {};
            script.onload = () => {
                document.getElementById('zipcode').addEventListener('click', handleZipcodeClick);
            };
        };

        loadDaumPostcodeScript();

        return () => {
            document.getElementById('zipcode').removeEventListener('click', handleZipcodeClick);
        };
    }, []);
    const handleInputChange = (e) => {
        const { id, name, value } = e.target;
        setAddressForm((prevForm) => ({
            ...prevForm,
            [id || name]: value,
        }));
    };

    const handleSaveClick = () => {
        // 주소 정보를 로컬 스토리지에 저장
        localStorage.setItem('savedAddress', JSON.stringify(addressForm));
        alert('주소 정보가 저장되었습니다.');
    };
    const handleZipcodeClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                document.getElementById('zipcode').value = data.zonecode;
                document.getElementById('address').value = data.address;
            },
        }).open();
    };

    return (
        <div>
            <input type="text" id="name" placeholder="이름" value={addressForm.name} onChange={handleInputChange} />
            <input
                type="text"
                id="phoneNumber"
                placeholder="전화번호"
                value={addressForm.phoneNumber}
                onChange={handleInputChange}
            />
            <input
                type="text"
                id="zipcode"
                placeholder="우편번호"
                value={addressForm.zipcode}
                onChange={handleInputChange}
            />
            <input
                type="text"
                id="address"
                placeholder="주소"
                readOnly
                value={addressForm.address}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="address2"
                placeholder="상세주소"
                value={addressForm.address2}
                onChange={handleInputChange}
            />
            <button onClick={handleSaveClick}>저장하기</button>
        </div>
    );
};

export default AddressComponent;
