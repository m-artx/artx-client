import React, { useEffect } from 'react';

const AddressComponent = ({ updateShippingAddress }) => {
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
      // 현재 입력된 주소 정보를 상위 컴포넌트로 전달
      updateShippingAddress({
         name: document.getElementById('name').value,
         phoneNumber: document.getElementById('phoneNumber').value,
         zipcode: document.getElementById('zipcode').value,
         address: document.getElementById('address').value,
         address2: document.querySelector('input[name=address2]').value,
      });
   };

   return (
      <div>
         <input type="text" id="name" placeholder="이름" />
         <input type="text" id="phoneNumber" placeholder="전화번호" />
         <input type="text" id="zipcode" placeholder="우편번호" />
         <input type="text" id="address" placeholder="주소" readOnly />
         <input type="text" name="address2" placeholder="상세주소" />
         <button onClick={handleSaveClick}>저장하기</button>
      </div>
   );
};

export default AddressComponent;
