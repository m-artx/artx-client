import React from 'react';
import Dummy3 from '../instance/dummy3';
import UnivSlider from '../components/UnivSlider';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';


// UnivSlider는 이미지 배열을 prop(?)으로 갖는다

function Test() {
  const data = Dummy3();
  let productId = 6;
  console.log('더미데이터' + data);

  // const imgArrData = data[0].productImageUrl;
  // console.log('이미지객체데이터' + imgArrData);

  let idData = data.find((product) => product.productId === parseInt(productId));

  //이미지가 하나여도 배열로 바꿔준다.
  let imgArrData = Array.isArray(idData.productImageUrl) 
                 ? idData.productImageUrl 
                 : [idData.productImageUrl];
  console.log('배열형태 이미지 데이터' + imgArrData);

  //imgArrData 이거 배열맞거든??
  const chechImgArrData = (Array.isArray(imgArrData))
  console.log('chechImgArrData ' + chechImgArrData)


  const univSlide = <UnivSlider slides={imgArrData} />;
  console.log('유니슬라이드로 배열값 map에 돌리고 div에 bg넣어서 배열 갯수만큼  div로 리턴' + univSlide);


  


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
  slidesToScroll: 2, // 한번에 스크롤할 슬라이드 수 (1로 설정)
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  dots: false,
  accessibility: true,
  draggable: true,
  initialSlide: 2, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
  // centerMode: true, // 가운데 모드 활성화
  centerPadding: '0',
  lazyLoad: true,
};
  return (
    <div className="">
      찍히나?
      <div className="w-[300px] h-[200px] border">
        내부값
        <Slider className="max-w-[600px] max-h-[600px] p-auto border"  {...settings}>
          <UnivSlider className="max-w-[600px] max-h-[600px] border" slides={imgArrData} />
        </Slider>
      </div>
      {/* {data[0].productImageUrl} */}
    </div>
  );
}

export default Test;
