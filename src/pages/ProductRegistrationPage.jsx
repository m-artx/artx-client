import React, { useState } from 'react';
import axios from 'axios';

function ProductRegistrationPage() {
   const [formData, setFormData] = useState({
      request: {
         userId: 'fafe2100-e770-4cfc-aef7-960837b777df',
         productCategoryId: 1,
         productName: '검은 장미',
         productTitle: '목탄으로 표현한 어둠 속에 피어난 장미',
         productDescription: '10년 전 우연히 길을 지나가다 발견한 장미의 낯빛이 어두웠습니다. 그때의 감정을..',
         productQuantity: 100,
         productPrice: 100000,
      },
      files: [],
   });
   const [inputValue, setInputValue] = useState(''); // 빈 문자열로 기본값 설정
   const handleInputChange = (e) => {
      const { name, value } = e.target;

      setFormData((prevFormData) => ({
         ...prevFormData,
         [name]: value,
      }));
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData((prevFormData) => ({
         ...prevFormData,
         files: file,
      }));
   };

   const addProduct = async (productData) => {
      try {
         const response = await axios.post(
            `https://64.110.89.251:8081/api/products/new
         /api/products/new`,
            productData
         );
         console.log('상품 등록 성공:', response.data);
         return response.data; // 성공 시 서버 응답 데이터 반환
      } catch (error) {
         console.error('상품 등록 실패:', error);
         throw error; // 실패 시 에러를 던져서 상위 컴포넌트에서 처리
      }
   };
   return (
      <div className="bg-black min-h-screen flex items-center justify-center">
         <div className="p-6 rounded-lg shadow-lg max-w-md w-full text-white">
            <h2 className="text-3xl font-semibold mb-4 text-center">작품 등록 페이지</h2>
            <form onSubmit={addProduct}>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 이미지:</label>
                  <input
                     type="file"
                     name="productImage"
                     accept=".png, .jpg, .jpeg"
                     onChange={handleFileChange}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 이름:</label>
                  <input
                     value={formData.productName}
                     onChange={handleInputChange}
                     type="text"
                     name="productName"
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 제목:</label>
                  <input
                     value={formData.productTitle}
                     onChange={handleInputChange}
                     type="text"
                     name="productTitle"
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 설명:</label>
                  <textarea
                     value={formData.productDescription}
                     onChange={handleInputChange}
                     name="productDescription"
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">수량:</label>
                  <input
                     type="number"
                     name="productQuantity"
                     onChange={handleInputChange}
                     value={formData.productQuantity}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">가격:</label>
                  <input
                     type="number"
                     name="productPrice"
                     onChange={handleInputChange}
                     value={formData.productPrice}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>

               <button
                  type="submit"
                  className="border border-white w-full py-2 bg-black text-white font-medium rounded transition duration-300 hover:bg-white hover:text-black"
               >
                  작품 등록
               </button>
            </form>
         </div>
      </div>
   );
}

export default ProductRegistrationPage;
