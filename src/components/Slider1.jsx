import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import customAxios from '../store/customAxios';

//메인화면 첫번째 슬라이더

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
    slidesToShow: 5, // 한 화면에 보여질 슬라이드 수 (1로 설정)
    slidesToScroll: 1, // 한번에 스크롤할 슬라이드 수 (1로 설정)
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
    accessibility: true,
    draggable: true,
    initialSlide: 1, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
    centerMode: true, // 가운데 모드 활성화
    centerPadding: '0',
    lazyLoad: true,
    autoplay: true,
    autoplayspeed: 5000,
};

function SlideMain() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // console.log('위치: 슬라이드메인')
        customAxios
            .get('/api/products/main?type=POPULARITY')
            .then((response) => {
                const array = response.data;
               //  console.log('위치: 슬라이드1', array);

                setData(array);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);


    const navigate = useNavigate();
    const goToProductDetail = (id) => {
        navigate(`/productdetail/${id}`);
    };

    return (
        <div id="slider1" className="  p-4 text-white justify-center">
            <Slider {...settings}>
                {data.map((image, idx) => (
                    <div key={idx}>
                        <img
                            src={image.productRepresentativeImage}
                            alt={`ProductId ${image.productId}`}
                            className=" object-fit h-[230px] w-[180px] pr-2 rounded-3xl"
                            onClick={() => goToProductDetail(image.productId)}
                        />
                        {image.샤싣}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SlideMain;
