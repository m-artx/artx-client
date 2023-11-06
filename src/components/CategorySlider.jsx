import React from 'react';
import ApiLoader from '../instance/ApiLoader';
import { useNavigate } from 'react-router-dom';



// 배열을 받아 슬라이드를 만든다

function CategorySlider() {
  const data = ApiLoader(process.env.REACT_APP_artx_prod_info);
  // console.log('카테고리이미지데이터' + data.length);
  const navigate = useNavigate();

  const goToCategory = (path) => {
    const url = `/products/${path}`;
    navigate(url);
  };

  return (
    <div className="flex justify-center flex-center w-[80%]">
      {data.map((item, idx) => (
        <div key={idx} className="flex border p-4 ">
          <div className="">
            <img
              src={`${item.productCategoryRepresentativeImage}`}
              className="object-cover h-[200px] w-[200px]"
              alt=""
              onClick={() => goToCategory(item.productCategoryName)}
            />
            <div>
              <p>{item.productCategoryName}</p>
              <p>{item.productCategoryDescription}</p>      
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySlider;
