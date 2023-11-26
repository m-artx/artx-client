import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../store/customAxios';

//메인화면 세번째 슬라이더
function CategorySlider() {
    const [data, setData] = useState([]);


    useEffect(() => {
        customAxios
            .get('/api/categories')
            .then((response) => {
                setData(response.data);
                console.log('카테고리슬라이더내부 리스폰스성공');
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log('카테고리슬라이더내부 에러');
            });
    }, []);


    console.log('카테고리이미지데이터' + data.length);
    const navigate = useNavigate();

    const goToCategory = (path) => {
        const url = `/productslist/${path}`;
        navigate(url);
    };


    return (
        <div className="flex justify-center flex-center w-[80%]">
            {data.map((item, idx) => (
                <div key={idx} className="flex border py-4 px-10 ">
                    <div className="">
                        <img
                            src={`${item.productCategoryRepresentativeImage}`}
                            className="object-cover h-[200px] w-[200px] rounded-sm "
                            alt=""
                            onClick={() => goToCategory(item.productCategoryType)}
                        />
                        <div>
                            <p>{item.productCategoryType}</p>
                            <p>{item.productCategoryDescription}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CategorySlider;
