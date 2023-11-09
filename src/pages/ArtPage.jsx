import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ArtSearch from '../components/shared/ArtSearch';
import axios from 'axios';

function ArtPage() {
   const [productList, setProductList] = useState([]);
   const [originalPosts, setOriginalPosts] = useState([]);
   const [name, setName] = useState('');
   const itemsPerPage = 6;
   const [currentPage, setCurrentPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`http://64.110.89.251:8081/api/products/main?type=POPULARITY`);
            setProductList(response.data);
            setOriginalPosts(response.data);
         } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
         }
      };

      fetchData();
   }, []);

   useEffect(() => {
      const search = async () => {
         try {
            const response = await axios.get(`http://64.110.89.251:8081/api/products/search`, {
               params: {
                  type: 'TITLE',
                  name: searchTerm,
                  page: 0,
                  size: 1,
                  sort: [],
               },
               headers: {},
            });

            const searchData = response.data;

            if (searchData.totalPages > 0 && searchData.totalElements > 0) {
               setProductList(searchData.content);
            } else {
               setProductList(originalPosts);
            }
         } catch (error) {
            console.log(error);
         }
      };

      search();
   }, [searchTerm]);

   const resetSearch = () => {
      setSearchTerm('');
      setProductList(originalPosts);
   };

   const totalPages = Math.ceil(productList.length / itemsPerPage);

   const nextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      } else {
         setCurrentPage(1);
      }
   };

   const prevPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      } else {
         setCurrentPage(totalPages);
      }
   };

   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentImageList = productList.slice(startIndex, endIndex);

   const imageComponents = currentImageList.map((image) => (
      <div className="xl:w-1/4 md:w-1/2 sm:w-1/2 p-4 mb-8 mx-auto relative group" key={image.productId}>
         <Link to={`/productdetail/${image.productId}`}>
            <div className="bg-gray-100 mx-auto overflow-hidden shadow-md transform transition-transform hover:scale-105 cursor-pointer">
               <div className="xl:w-1/4 md:w-1/2 sm:w-1/2 p-4 mb-8 mx-auto relative group">
                  <img
                     className="h-28 w-full object-cover object-center mb-6 bg"
                     src={image.productRepresentativeImage}
                     alt="content"
                  />
               </div>

               <h3 className="tracking-widest text-black text-s font-medium title-font ml-3 hover:font-bold bg-white">
                  {image.productTitle}
               </h3>

               <p className="leading-relaxed text-base ml-3 bg-white text-black">₩{image.productPrice}</p>
            </div>
         </Link>
      </div>
   ));

   const handleInputChange = (e) => {
      const { value } = e.target;
      setSearchTerm(value);
   };

   return (
      <div className="border">
         <section className="text-gray-600 body-font mx-auto">
            <div className="container px-5 mx-auto">
               <ArtSearch handleInputChange={handleInputChange} handleSearch={resetSearch} resetSearch={resetSearch} />
               <div>
                  <div className="flex justify-between items-center text-black">
                     <button className="mr-10 transform hover:scale-10" onClick={prevPage}>
                        <FontAwesomeIcon icon={faArrowLeft} size="2xl" style={{ color: '#c7c7c7' }} />
                     </button>

                     <div className="flex flex-wrap -m-4 justify-center">{imageComponents}</div>

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
