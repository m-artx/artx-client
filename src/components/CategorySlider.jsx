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

    const getImageUrl = (category) => {
        switch (category) {
            case 'ETC':
                return 'https://ticketimage.interpark.com/EdailyNews/E_PS15040700439.jpg'; // Replace with your ART image path
            case 'PAINT':
                return 'https://dvqlxo2m2q99q.cloudfront.net/000_clients/698901/page/another-day-12x10-6-hr-12-8-23-b26fea.jpg'; // Replace with your PAINT image path
            case 'CERAMIC':
                return 'https://sellerocean.com/files/attach/images/181/462/876/005/afbc2ffa5589936a743fd1defb8584f8.jpg'; // Replace with your CERAMIC image path
            default:
                return category.productCategoryRepresentativeImage;
        }
    };

    return (
        <div className="flex justify-center flex-center w-[80%]">
            {data.map((item, idx) => (
                <div key={idx} className="flex py-4 px-10 ">
                    <div>
                        <img
                            src={getImageUrl(item.productCategory)}
                            className="object-cover h-[250px] w-[250px] rounded-sm "
                            alt=""
                            onClick={() => goToCategory(item.productCategory)}
                        />
                        <div className="flex items-center justify-center flex-col">
                            <p className="text-center py-2">{item.productCategory}</p>
                            <p className="w-[175px] text-center">
                                {item.productCategoryDescription}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CategorySlider;
