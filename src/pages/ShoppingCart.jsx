import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios 라이브러리를 임포트

function ShoppingCart() {
  // 초기 장바구니 상태
  const initialCartItems = [
    {
      id: 1,
      name: '상품 1',
      price: 1000,
      quantity: 2,
      imageUrl: 'https://og-data.s3.amazonaws.com/media/artstory/post_image/20/2.jpg',
    },
    {
      id: 2,
      name: '상품 2',
      price: 1500,
      quantity: 1,
      imageUrl: 'https://og-data.s3.amazonaws.com/media/artstory/post_image/20/2.jpg',
    },
    {
      id: 3,
      name: '상품 3',
      price: 800,
      quantity: 3,
      imageUrl: 'https://og-data.s3.amazonaws.com/media/artstory/post_image/20/2.jpg',
    },
  ];
  // 주문하기 함수
  const placeOrder = () => {
    if (selectedItems.length === 0) {
      alert('주문할 상품을 선택해주세요.');
    } else {
      // 사용자 데이터 생성
      const userData = {
        username: 'string',
        password: 'string',
        email: 'string',
        isEmailYn: true,
        nickname: 'string',
        phoneNumber: 'string',
        address: 'string',
        addressDetail: 'string',
        userRole: 'USER',
      };

      // API 요청 보내기
      axios
        .post('https://your-api-url.com/주문-엔드포인트', userData)
        .then((response) => {
          // API 요청이 성공한 경우, 추가 작업을 수행할 수 있습니다.
          alert(`주문이 완료되었습니다. 총 가격: ${selectedItemsTotalPrice}원`);
        })
        .catch((error) => {
          // API 요청이 실패한 경우 오류 메시지를 처리할 수 있습니다.
          alert('주문 처리 중 오류가 발생했습니다.');
        });
    }
  };
  // 장바구니 상품 목록을 관리하는 상태
  const [cartItems, setCartItems] = useState(initialCartItems);

  // 선택한 상품을 추적하는 상태
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // 상품을 장바구니에 추가하는 함수
  const addToCart = (product) => {
    // 이미 장바구니에 있는 상품인지 확인
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // 이미 장바구니에 있는 경우, 수량을 증가
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // 장바구니에 없는 경우, 새로운 항목으로 추가
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // 장바구니에서 상품을 제거하는 함수
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  // 상품을 선택 또는 해제하는 함수
  const toggleItemSelection = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };
  // 전체 선택 체크박스를 토글하는 함수
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  // 선택된 상품들의 가격 합계 계산
  const selectedItemsTotalPrice = cartItems.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  // 주문하기 함수
  const placeOrderalert = () => {
    if (selectedItems.length === 0) {
      alert('주문할 상품을 선택해주세요.');
    } else {
      alert(`주문이 완료되었습니다. 총 가격: ${selectedItemsTotalPrice}원`);
    }
  };

  // 선택된 상품을 장바구니에서 제거하는 함수
  const removeSelectedItems = () => {
    const updatedCart = cartItems.filter((item) => !selectedItems.includes(item.id));
    setCartItems(updatedCart);
    // 선택 해제
    setSelectedItems([]);
  };

  return (
    <div className=" bg-white text-black p-4  w-screen">
      <h1 className="text-4xl font-bold mb-4 flex justify-center  ">장바구니</h1>
      <div className="flex flex-col">
        <span className="flex justify-center">장바구니-주문서 작성 및 결제-주문 확인</span>
        <button
          onClick={removeSelectedItems}
          className="px-4 py-2 mt-4 mb-4  border border-solid border-black w-40 ml-3"
        >
          삭제하기
        </button>
      </div>
      <ul className="border-solid border-t border-b border-black ml-3">
        <li className="flex items-center mb-2 ">
          <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} className="mr-2 ml-0" />
          <span>전체 선택</span>
        </li>
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleItemSelection(item.id)}
              className="mr-2"
            />
            <img src={item.imageUrl} alt={item.name} width="100" height="100" />
            <div className="ml-4">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-400">가격: {item.price}원</p>
              <p className="text-gray-400">수량: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                제거
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className=" items-center mt-4  p-4 flex justify-end flex-col border border-solid border-black w-60 ml-auto">
        <div className="">
          <p className="mr-4">선택된 상품 합계+ {selectedItemsTotalPrice}원</p>
          <p>배송비 + 3000원</p>
        </div>
        <p className="mr-4 font-bold ">결제 예정 금액= {selectedItemsTotalPrice + 3000}원</p>
        <button onClick={placeOrderalert} className="bg-black text-white px-4 py-2">
          주문하기
        </button>
      </div>
      <Link to="art">쇼핑 계속하기</Link>
    </div>
  );
}

export default ShoppingCart;
