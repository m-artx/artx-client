import React from 'react';
import { useParams } from 'react-router-dom';
import ApiLoader from '../instance/ApiLoader' 
import Dummy4 from '../instance/dummy4';

//제품 카테고리별 이미지 목록 반환

function ProductList() {

  let { categoryName } = useParams();
  const apidata = ApiLoader();

  // let categoryData = data.find((product) => product.categoryName === parseInt(categoryName));

  //dummy3 데이터 임시로 가져옴. [{price, productId, productImageUrl[]}

  const data = Dummy4();
  console.log(data);

  
  return (
    <div>
      <div>도자기</div>
      <div className="w-[100%]">
        {data.map((item, idx) => (
          <div key={item.productId || idx}>
            {/* 이미지가 1개만있어서 배열이 아니면 그냥 url에 넣는다. */}
            <img
              src={
                Array.isArray(item.categoryRepresentativeImage)
                  ? item.categoryRepresentativeImage[0]
                  : item.categoryRepresentativeImage
              }
              alt={item.productTitle || 'Product Image'}
            />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default ProductList;
