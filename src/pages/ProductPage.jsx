import React from 'react';
import { useParams } from 'react-router-dom';
import Dummy3 from '../instance/dummy3'

{
  /* 임시로이미지를넣어보자! */
}
function ProductPage() {
  let { productId } = useParams();
  const dummy = <Dummy3 />
  console.log('히히' + dummy)


  return (
    <div className="flex items-center w-screen max-w-[1500px]">
      <div className="flex justify-center  border w-full h-full">
        <div className="flex-1 border border-red-800 ">
          <img
            className="p-20 pr-0"
            src="https://art.honam.ac.kr/attach/board/251/content/20171213173006GYkEJTNMTwYqlU8vXRVr.png"
            alt="art"
          />
        </div>
        <div className="flex-1 flex justify-center items-center pb-20 border border-red-800">
          <div className="flex flex-col bg-yellow-100">
            
              <p className=" min-w-[300px] max-w-[100px] text-center">김소리 &lt; 눕자 &gt;</p>  
              <p className=" min-w-[300px] max-w-[100px] text-center text-gray-500 decoration-slice italic">'KIM, SORI' &lt; Ley down &gt;</p>  
              <p className="  min-w-[300px] max-w-[100px] text-center">1990, 유화,  1200 * 1000 </p>
              <p className=" min-w-[300px] max-w-[100px] text-center text-gray-500 decoration-slice italic">1990, oil paint, 1200 * 1000  &lt; Ley down &gt;</p>  

              
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
