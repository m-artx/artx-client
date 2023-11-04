import React, { useState, useEffect } from 'react';
import Dummy3 from '../instance/dummy2';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const dummy = Dummy3();

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

const imgArr = dummy[0].productImageUrl;
console.log('imgArr : ' + imgArr);

function SlideMain() {
  // 인라인 스타일을 반환하는 함수

  return (
    <div className="border border-yellow-200 text-white">
      {/* 맵을 돌면서 배열의 productImageUrl반환하는 div 만들면..
        인덱스를 이미지 교환에 사용하므로 쓸수가 없으니까
        인덱스를 쓰지말고 스케일처리된 디브를 준 다음 디브의 배경을 바꾸자! 
         */}

      <Slider className="relative min-h-[200px]" {...settings}>
        {/* 이미지를 img에 넣는냐 
        이미지가 반응형으로 줄어들지않는다
        */}
        {/* {dummy.map((image, idx) => (
          <div key={idx}>
            <div className="flex-1 border border-red-500 rounded-xl w-[500px] overflow-hidden">
              <img
                src={image.productImageUrl}
                alt={`이미지 ${idx}`}
                className="w-[200px] h-[200px] object-cover rounded-xl" // `object-cover`가 `object-fit: cover;`와 동일합니다.
              />
            </div>
          </div>
        ))} */}
        {/* 아니면 div에 bg로 넣느냐 
        이미지가 반응형으로 줄어드는 편이다
        */}
        {dummy.map((image, idx) => (
          <div key={idx}>
            <div
              className="flex-1 w-[80%] h-[100px]  border border-red-500 rounded-3xl"
              style={{
                backgroundImage: `url(${image.productImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
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
