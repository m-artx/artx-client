import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import ApiLoader from '../instance/ApiLoader';
import { useNavigate } from 'react-router-dom';
// 최상위 슬라이드

const PrevArrow = ({ onClick }) => {
   return (
      <div
         className="absolute top-[50%] left-[-50px] transform -translate-y-1/2 cursor-pointer z-10 text-4xl"
         onClick={onClick}
      >
         <BsChevronCompactLeft />
      </div>
   );
};

const NextArrow = ({ onClick }) => {
   return (
      <div
         className="absolute top-[50%] right-[-50px] transform -translate-y-1/2 cursor-pointer z-10 text-4xl"
         onClick={onClick}
      >
         <BsChevronCompactRight />
      </div>
   );
};

const settings = {
   infinite: true,
   speed: 500,
   slidesToShow: 6, // 한 화면에 보여질 슬라이드 수 (1로 설정)
   slidesToScroll: 1, // 한번에 스크롤할 슬라이드 수 (1로 설정)
   nextArrow: <NextArrow />,
   prevArrow: <PrevArrow />,
   dots: false,
   accessibility: true,
   draggable: true,
   initialSlide: 1, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
   // centerMode: true, // 가운데 모드 활성화
   centerPadding: '0',
   lazyLoad: true,
};

function SlideMain() {
   const apiData = ApiLoader(process.env.REACT_APP_artx_prod_pop_ten);
   //apiData가 array가 아닌 경우도 처리해야하나?

   const navigate = useNavigate();
   const goToProductDetail = (id) => {
      navigate(`/productdetail/${id}`);
   };

   return (
      <div className="border border-yellow-200 text-white ">
         <Slider className="relative min-h-[200px]" {...settings}>
            {apiData.map((image, idx) => (
               <div key={idx} className="h-[200px]">
                  <div
                     className="flex-1 w-[80%] h-[200px]  border border-red-500 rounded-xl"
                     style={{
                        backgroundImage: `url(${image.productRepresentativeImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                     }}
                     onClick={() => goToProductDetail(image.productId)}
                  ></div>
               </div>
            ))}

            {/* <div className="flex-1 min-w-[100px] min-h-[180px] border border-red-500">1</div>
          <div className="flex-1 min-w-[100px] min-h-[180px] border border-red-500">2</div>
          <div className="flex-1 min-w-[100px] min-h-[180px] border border-red-500">3</div>
          <div className="flex-1 min-w-[100px] min-h-[180px] border border-red-500">4</div>
          <div className="flex-1 min-w-[100px] min-h-[180px] border border-red-500">5</div>
          <div className="flex-1 min-w-[100px] min-h-[180px] border border-red-500">6</div> */}

            {/* <div className="px-4 h-auto">1
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto" src={dummy[0].productImageUrl} />
        </div>
        <div className="px-4 h-auto">2
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto" src={dummy[1].productImageUrl} />
        </div>
        <div className="px-4 h-auto">3
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto" src={dummy[2].productImageUrl} />
        </div>
        <div className="px-4 h-auto">4
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto" src={dummy[4].productImageUrl} />
        </div>
        <div className="px-4 h-auto">5
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto " src={dummy[5].productImageUrl} />
        </div>
        <div className="px-4 h-auto">6
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto " src={dummy[6].productImageUrl} />
        </div>
        <div className="px-4 h-auto">7
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto" src={dummy[7].productImageUrl} />
        </div>
        <div className="px-4 h-auto">8
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto " src={dummy[8].productImageUrl} />
        </div>
        <div className="px-4 h-auto">9
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto " src={dummy[9].productImageUrl} />
        </div>
        <div className="px-4 h-auto">10
          <img className="w-[180px] h-[220px] rounded-xl object-cover m-auto " src={dummy[9].productImageUrl} />
        </div> */}
         </Slider>
      </div>

      // <div className="border border-yellow-200 h-100%" style={{}}>
      //   <Slider className="relative" {...settings}>
      //     {dummy.map((image, idx) => (
      //       <div key={idx} >
      //         <div className="px-4 h-auto">
      //           <img
      //             className="w-[180px] h-[220px] rounded-xl object-cover m-auto"
      //             src={image.productImageUrl}
      //             alt={`이미지 ${idx}`}
      //           />
      //         </div>
      //       </div>
      //     ))}
      //   </Slider>
      // </div>
   );
}

export default SlideMain;
