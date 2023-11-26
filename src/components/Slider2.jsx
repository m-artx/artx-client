import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import customAxios from '../store/customAxios';

const Slider2 = () => {
    const sliderRef1 = useRef(); // 첫 번째 슬라이더 ref

    const [data, setData] = useState([]);

    useEffect(() => {
        customAxios
            .get('/api/products/main?type=POPULARITY')
            .then((response) => {
                setData(response.data);
                //  console.log('카테고리슬라이더내부 리스폰스성공')
            })
            .catch((error) => {
                console.error('Error:', error);
                //  console.log('카테고리슬라이더내부 에러')
            });
    }, []);

    // console.log(apiData.length)
    const doubleData = [...data, ...data, ...data];

    const halfIndex = Math.ceil(doubleData.length / 2);
    const firstHalf = doubleData.slice(0, halfIndex);
    const secondHalf = doubleData.slice(halfIndex);
	console.log(firstHalf)
	console.log(secondHalf)
	

    const navigate = useNavigate();
    const goToProductDetail = (id) => {
        navigate(`/productdetail/${id}`);
    };

 
    const settings1 = {
        slidesToShow: 10,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 4000,
        cssEase: 'linear',
        infinite: true,
        focusOnSelect: false,
        arrows: false,
   
    };

    const settings2 = {
        slidesToShow: 10,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 4000,
        cssEase: 'linear',
        infinite: true,
        focusOnSelect: false,
        arrows: false,
    };

    return (
        <div id="slider1" className="  text-white justify-center  h-[300px] overflow-hidden">
            {/* 첫 번째 슬라이더 */}
            <div className=" w-[1200px] h-[140px]">
                <Slider {...settings1} className="">
                    {firstHalf.map((item, idx) => (
                        <div key={idx} className="h-[120px]  ">
                            <img
                                src={item.productRepresentativeImage}
                                alt={`ProductId ${item.productId}`}
                                className=" object-fit h-[120px] w-[90px] rounded-2xl  "
                                onClick={() => goToProductDetail(item.productId)}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div style={{ textAlign: 'center' }}></div>

            {/* 두 번째 슬라이더 */}
            <div className=" w-[1200px] h-[140px] ">
                <Slider {...settings2} className="right-[45px]">
                    {secondHalf.map((item, idx) => (
                        <div key={idx} className="h-[120px]  ">
                            <img
                                src={item.productRepresentativeImage}
                                alt={`ProductId ${item.productId}`}
                                className=" object-fit h-[120px] w-[90px]  rounded-2xl "
                                onClick={() => goToProductDetail(item.productId)}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Slider2;
