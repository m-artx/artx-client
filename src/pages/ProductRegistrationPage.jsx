import React, { useState } from 'react';
import axios from 'axios';

function ProductRegistrationPage() {
   const [request, setRequest] = useState({
      userId: 'dd877036-b45e-4e13-8563-e985ab8cd9b2',
      productCategory: 'PAINT',
      productTitle: '',
      productDescription: '',
      productQuantity: 0,
      productPrice: 0,
   });
   const [files, setFiles] = useState(null);

   const [inputValue, setInputValue] = useState(''); // 빈 문자열로 기본값 설정
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRequest((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFiles(file);
   };

   const addProduct = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('files', files);

      const json = JSON.stringify(request);
      const blob = new Blob([json], { type: 'application/json' });

      formData.append('request', blob);

      // Axios를 사용하여 FormData를 전송
      axios
         .post('https://ka8d596e67406a.user-app.krampoline.com/api/products', formData)
         .then((response) => {
            console.log(response);
         })
         .catch((error) => {
            console.log(error);
         });
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
                     name="files"
                     accept=".png, .jpg, .jpeg"
                     onChange={handleFileChange}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품명:</label>
                  <input
                     value={request.productTitle}
                     onChange={handleInputChange}
                     type="text"
                     name="productTitle"
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">작품 설명:</label>
                  <textarea
                     value={request.productDescription}
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
                     value={request.productQuantity}
                     className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                  />
               </div>
               <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">가격:</label>
                  <input
                     type="number"
                     name="productPrice"
                     onChange={handleInputChange}
                     value={request.productPrice}
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
