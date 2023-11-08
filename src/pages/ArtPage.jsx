import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import ArtSearch from '../components/shared/ArtSearch';
import axios from 'axios';

function ArtPage() {
   const [productList, setProductList] = useState([
      // imageList를 productList로 변경
      {
         url: 'https://dummyimage.com/720x400',
         title: 'Title 1',
         name: 'name',
         price: 10000,
         id: 0,
      },
      {
         url: 'https://dummyimage.com/720x400',
         title: 'Title 2',
         name: 'name',
         price: 15000,
         id: 1,
      },
      {
         url: 'https://dummyimage.com/720x400',
         title: 'Title 3',
         name: 'name',
         price: 12000,
         id: 2,
      },
   ]);

   const itemsPerPage = 8; // 한 페이지당 보여줄 항목 수
   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

   const [filteredProductList, setFilteredProductList] = useState([]);

   // 컴포넌트가 마운트될 때 Axios를 사용하여 데이터를 가져옵니다.
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get('http://64.110.89.251:8081/api/products/main?type=POPULARITY'); //
            setProductList(response.data);
            setFilteredProductList(response.data);
         } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
         }
      };

      fetchData();
   }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과가 한 번만 실행되도록 합니다.

   const totalPages = Math.ceil(productList.length / itemsPerPage);

   // 다음 페이지로 이동하는 함수
   const nextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      } else {
         // 다음 페이지가 없는 경우 첫 페이지로 돌아가도록 설정
         setCurrentPage(1);
      }
   };

   // 이전 페이지로 이동하는 함수
   const prevPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      } else {
         // 첫 페이지에서 이전 버튼을 누르면 마지막 페이지로 이동
         setCurrentPage(totalPages);
      }
   };

   // 현재 페이지에 표시할 이미지 목록을 계산
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentImageList = productList.slice(startIndex, endIndex);

   const imageComponents = currentImageList.map((image, index) => (
      <div className="xl:w-1/4 md:w-1/2 sm:w-1/2 p-4 mb-8 mx-auto relative group" key={index}>
         <div className="bg-gray-100 mx-auto overflow-hidden shadow-md transform transition-transform hover:scale-105 cursor-pointer">
            <img
               className="h-28 w-full object-cover object-center mb-6 bg"
               src={image.productRepresentativeImage}
               alt="content"
            />
            <h3 className="tracking-widest text-black text-s font-medium title-font ml-3 hover:font-bold bg-white">
               {image.productTitle}
            </h3>
            <p className="leading-relaxed text-base ml-3 bg-white ">₩{image.productPrice}</p>
         </div>
      </div>
   ));

   return (
      <div className="border">
         <section className="text-gray-600 body-font mx-auto">
            <div className="container px-5 mx-auto">
               <ArtSearch />
               <div>
                  <div className="flex justify-between items-center text-white">
                     <button className="mr-10 transform hover:scale-10" onClick={prevPage}>
                        <FontAwesomeIcon icon={faArrowLeft} size="2xl" style={{ color: '#c7c7c7' }} />
                     </button>
                     <Link to="product">
                        <div className="flex flex-wrap -m-4 justify-center">{imageComponents}</div>
                     </Link>
                     <button className="ml-10 transform hover:scale-110" onClick={nextPage}>
                        <FontAwesomeIcon icon={faArrowRight} size="2xl" style={{ color: '#c7c7c7' }} />
                     </button>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

export default ArtPage;
