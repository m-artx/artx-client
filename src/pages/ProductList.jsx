import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Search from '../components/shared/Search';
import useApiLoader from '../instance/useApiLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ProductList() {
   let { productCategoryType } = useParams();
   let apiUrl;
   const navigate = useNavigate();

   // productCategoryType에 따라 apiUrl 변경
   if (productCategoryType === 'PAINT') {
      apiUrl = process.env.REACT_APP_artx_prod_paint;
   } else if (productCategoryType === 'CERAMIC') {
      apiUrl = process.env.REACT_APP_artx_prod_ceramic;
   } else if (productCategoryType === 'ETC') {
      apiUrl = process.env.REACT_APP_artx_prod_etc;
   } else if (productCategoryType === 'ALL') {
      apiUrl = process.env.REACT_APP_artx_prod_all;
   }

   // useApiLoader 사용하기
   const { data: apiData, loading, error } = useApiLoader(apiUrl);
<<<<<<< HEAD
   console.log('apiData', apiData)

=======
>>>>>>> develop

   // 페이지네이션용
   const itemsPerPage = 8; // 한페이지당 이미지숫자
   const [currentPage, setCurrentPage] = useState(1); // 현재페이지

   // 데이터나누는부분
   const totalPages = apiData ? Math.ceil(apiData.content.length / itemsPerPage) : 0;

   // 인덱스계산부분
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

   // 인덱스 자름
   const currentItems = apiData && apiData.content ? apiData.content.slice(indexOfFirstItem, indexOfLastItem) : [];

   // 페이지 앞뒤버튼 함수들
   const nextPage = () => {
      setCurrentPage((currentPage) => (currentPage < totalPages ? currentPage + 1 : 1));
   };
   const prevPage = () => {
      setCurrentPage((currentPage) => (currentPage > 1 ? currentPage - 1 : totalPages));
   };

   // 데이터 로딩상태 메시지
   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;

   const GoToProductDetail = (id) => {
      navigate(`/productdetail/${id}`);
   };

<<<<<<< HEAD

   console.log('currentItems', currentItems)

=======
>>>>>>> develop
   return (
      <div className="w-screen border max-w-[1300px] border-blue-600 flex flex-col ">
         <div className="text-center">
            <div className="text-3xl sm:text-8xl font-medium border">{productCategoryType}</div>
            <Search />
            <section className="border border-red-600 flex flex-wrap justify-center p-3">
               {currentItems.map((item, index) => (
                  <div key={index} className="border w-[200px] h-[300px] flex flex-col m-8 mt-10 ">
                     <img
                        src={item.productRepresentativeImage}
                        alt={`Product ${item.productName}`}
                        className="border rounded-md object-cover"
                        onClick={() => GoToProductDetail(item.productId)}
                     />
                     <div className="flex justify-around">
                        <p>{item.productTitle}</p>
                        <p>{item.productPrice} </p>
                     </div>
                  </div>
               ))}
            </section>
            <div className="flex justify-center items-center mt-10 ">
               <button className="px-10 transform hover:scale-110" onClick={prevPage}>
                  <FontAwesomeIcon icon={faArrowLeft} size="2x" style={{ color: '#c7c7c7' }} />
               </button>
               <button className="px-10 transform hover:scale-110" onClick={nextPage}>
                  <FontAwesomeIcon icon={faArrowRight} size="2x" style={{ color: '#c7c7c7' }} />
               </button>
            </div>
         </div>
      </div>
   );
}

export default ProductList;
