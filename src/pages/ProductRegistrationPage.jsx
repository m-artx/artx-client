import React, { useState } from 'react';

function ProductRegistrationPage() {
   const [formData, setFormData] = useState({
      request: {
         userId: '',
         productCategoryId: '1',
         productName: '',
         productTitle: '',
         productDescription: '',
         productQuantity: '',
         productPrice: '',
      },
      files: ['string'],
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;

      setFormData((prevFormData) => ({
         ...prevFormData,
         request: {
            ...prevFormData.request,
            [name]: value,
         },
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch(`http://64.110.89.251:8081/api/products/new`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         if (response.ok) {
            console.log('작품이 성공적으로 등록되었습니다!');
            // 여기서 다른 작업 수행 가능
         } else {
            console.error('작품 등록에 실패했습니다.');
         }
      } catch (error) {
         console.error('오류가 발생했습니다:', error);
      }
   };

   return (
      <div className="bg-black min-h-screen flex items-center justify-center">
         <div className="p-6 rounded-lg shadow-lg max-w-md w-full text-white">
            <h2 className="text-3xl font-semibold mb-4 text-center">작품 등록 페이지</h2>
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 이미지:</label>
                  <input
                     type="file"
                     name="productImage"
                     accept=".png, .jpg, .jpeg"
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 이름:</label>
                  <input
                     type="text"
                     name="productName"
                     onChange={handleInputChange}
                     value={formData.request.productName}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 제목:</label>
                  <input
                     value={formData.request.productTitle}
                     onChange={handleInputChange}
                     type="text"
                     name="productTitle"
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 설명:</label>
                  <textarea
                     value={formData.request.productDescription}
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
                     value={formData.request.productQuantity}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">가격:</label>
                  <input
                     type="number"
                     name="productPrice"
                     onChange={handleInputChange}
                     value={formData.request.productPrice}
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
