import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Search from '../components/shared/Search';
import SlideMain from '../components/SlideMain';
import SlideSecond from '../components/SlideSecond';
import CategorySlider from '../components/CategorySlider';
import { useParams, useNavigate } from 'react-router-dom';

function MainPage() {
   const [searchTerm, setSearchTerm] = useState('');
   const [data, setData] = useState([]);
   let { productCategoryType } = useParams();
   let apiUrl;
   const navigate = useNavigate();
   useEffect(() => {
      if (searchTerm.trim() === '') {
         setData([]);
      } else {
         searchData(searchTerm);
      }
   }, [searchTerm]);

   const searchData = async (searchTerm) => {
      try {
         const response = await Axios.get(`https://ka8d596e67406a.user-app.krampoline.com/api/products/search`, {
            params: {
               searchTerm: searchTerm,
            },
         });
         setData(response.data.productTitle);
      } catch (error) {
         console.error('데이터를 가져오는 중 오류 발생:', error);
         setData([]);
      }
   };

   // Modify the handleSearch function to accept the new search term
   const handleSearch = (newSearchTerm) => {
      setSearchTerm(newSearchTerm);
   };

   return (
      <div className="flex items-center flex-col border max-w-[1300px]">
         <div className="flex flex-col items-center justify-center border border-blue-700 max-w-[1300px] h-[1000px]">
            <div className="h-[100px]">
               {/* Pass the handleSearch function to the Search component */}
               <Search onChange={handleSearch} />
            </div>

            <div className="w-[80%] flex-1">
               {data.map((item) => (
                  <div key={item.productId}>
                     <div>상품명: {item.productTitle}</div>
                     <div>가격: {item.productPrice}</div>
                     <img src={item.productRepresentativeImage} alt={item.productTitle} />
                  </div>
               ))}
            </div>

            <div className="flex flex-col w-[100%] h-screen">
               <div className=" flex-1 border bg-slate-400 pt-2 flex flex-col items-center overflow-hidden">
                  <p className="p-3">인기작가:新作</p>
                  <div className="w-[80%] flex-1">
                     <SlideMain />
                  </div>
               </div>
               <div className="flex-1 border bg-slate-400 pt-2 flex flex-col items-center overflow-hidden">
                  <p className="p-3">주목할만한:作</p>
                  <div className="w-[80%] flex-1">
                     <SlideSecond />
                  </div>
               </div>
            </div>
         </div>

         <div className="flex w-full">
            <div className="flex flex-col w-full items-center pt-2 border yellow-purple-800 overflow-hidden h-[400px]">
               <p className="p-3">둘러보기</p>
               <div className="flex border w-screen justify-center">
                  <CategorySlider />
               </div>
            </div>
         </div>
      </div>
   );
}

export default MainPage;
