import React from 'react';

function OrderPage(props) {
  // props로 선택된 상품 정보를 받아옵니다.

  const selectedProducts = props.location?.state?.selectedProducts || [];

  // 주문하기 페이지 내용을 구현합니다.

  return (
    <div className="bg-white text-black p-4 w-screen">
      <h1 className="text-4xl font-bold mb-4 flex justify-center bg-white text-black">주문하기</h1>

      {/* 선택된 상품 정보를 여기에 출력 */}
      {selectedProducts.map((product) => (
        <div key={product.productId} className="bg-white text-black">
          <p>{product.productTitle}</p>
          <p>가격: {product.productPrice}원</p>
          <p>수량: {product.cartProductQuantity}</p>
        </div>
      ))}

      {/* 주문서 작성 양식을 추가합니다. */}
      {/* 여기에 주문자 정보, 배송 정보, 결제 수단 선택 등을 구현할 수 있습니다. */}

      <button className="bg-black text-white px-4 py-2">결제하기</button>
    </div>
  );
}

export default OrderPage;