import React from 'react';
import Dummy2 from '../instance/dummy2';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

// import ApiLoader from "../instance/ApiLoader";
// import { ApiLoader } from '../instance/ApiLoader'
// import { ProcessData} from '../instance/ProcessData'

// const aoidata = ApiLoader();
// console.log(ApiLoader)
const dummy = Dummy2();

// const apiData = ApiLoader(); // API 데이터 받아오기
// const processedData = ProcessData(apiData); // API 데이터 처리

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow left" onClick={onClick}>
      <BsChevronCompactLeft />
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow right" onClick={onClick}>
      <BsChevronCompactRight />
    </div>
  );
};

// const settings = {
//   infinite: true,
//   speed: 500,
//   slidesToShow: 6, //한 화면에 보여질 슬라이드 수
//   slidesToScroll: 2, //한번에 스크롤할 슬라이드 수
//   nextArrow: <NextArrow />,
//   prevArrow: <PrevArrow />,
//   dots: false,
//   accessibility: true,    // 키보드
//   draggable: true,
//   initialSlide: 2, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
//   centerPadding: '0',
  
// };



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
  initialSlide: 2, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
  centerMode: true, // 가운데 모드 활성화
  centerPadding: '0',
};


function SlideMain() {
  return (
    <div className="carousel">
      <Slider {...settings} className="slides">
        {dummy.map((image, idx) => (
          <div
            className={`slide ${
              idx === 0 || idx === 5 ? 'small-slide' : idx === 1 || idx === 4 ? 'medium-slide' : 'large-slide'
            }`}
            key={idx}
          >
            <img className="box" src={image.productImageUrl} alt={`이미지 ${idx}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideMain;
