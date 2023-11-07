import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 라이브러리를 임포트

function ShoppingCart() {
  // 초기 장바구니 상태

  const [cartItems, setCartItems] = useState([]);
  const cartId = 1; // 가져오려는 장바구니 ID

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 장바구니 데이터를 가져오는 부분
    axios
      .get(`http://64.110.89.251:8081/api/carts/${cartId}`)
      .then((response) => {
        const cartData = response.data;
        // cartItemDetails를 사용하여 배열을 얻음
        const cartArray = cartData.cartItemDetails;
        setCartItems(cartArray);
        console.log(cartArray);
      })
      .catch((error) => {
        console.error('API 요청 중 오류 발생:', error);
      });
  }, []);

  const increaseQuantity = (productId) => {
    // API 요청을 보내어 서버에서 수량을 증가시킴
    axios
      .patch(`http://64.110.89.251:8081/api/carts/${cartId}/products/11/increase`)
      .then((response) => {
        const updatedCart = cartItems.map((item) => {
          if (item.productId === productId) {
            return { ...item, cartProductQuantity: item.cartProductQuantity + 1 };
          }

          return { ...item, cartProductQuantity: item.cartProductQuantity + 1 };
        });
        setCartItems(updatedCart);
        console.log(updatedCart);
      })

      .catch((error) => {
        alert('수량 증가 중 오류가 발생했습니다.');
      });
  };

  const decreaseQuantity = (productId) => {
    // API 요청을 보내어 서버에서 수량을 감소시킴
    axios
      .patch(`http://64.110.89.251:8081/api/carts/${cartId}/products/11/decrease`)
      .then((response) => {
        const updatedCart = cartItems.map((item) => {
          if (item.productId === productId && item.quantity > 1) {
            return { ...item, cartProductQuantity: item.cartProductQuantity - 1 };
          }
          return { ...item, cartProductQuantity: item.cartProductQuantity - 1 };
        });
        setCartItems(updatedCart);
        console.log(updatedCart);
      })
      .catch((error) => {
        alert('수량 감소 중 오류가 발생했습니다.');
      });
  };

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
      // 체크박스를 선택 해제하면 전체 선택 체크박스도 해제
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };
  // 전체 선택 체크박스를 토글하는 함수
  const toggleSelectAll = () => {
    // 체크박스를 전체 선택하면 선택된 상품들의 ID를 배열로 설정
    if (!selectAll) {
      setSelectedItems(cartItems.map((item) => item.productId));
    } else {
      // 체크박스를 해제하면 선택된 상품들의 ID를 빈 배열로 설정
      setSelectedItems([]);
    }
    setSelectAll(!selectAll); // 전체 선택 상태를 토글
  };
  // 선택된 상품들의 가격 합계 계산

  //삭제하기
  const removeFromSelected = () => {
    if (selectedItems.length === 0) {
      alert('삭제할 상품을 선택해주세요.');
    } else {
      const confirmDelete = window.confirm('선택한 상품을 삭제하시겠습니까?');

      if (confirmDelete) {
        const updatedCart = cartItems.filter((item) => !selectedItems.includes(item.productId));
        setCartItems(updatedCart);
        setSelectedItems([]); // 선택된 항목을 초기화
      }
    }
  };

  // 선택된 상품을 장바구니에서 제거하는 함수

  // 선택된 상품 합계 계산 함수
  const orderTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      if (selectedItems.includes(item.productId)) {
        total += item.productPrice * item.cartProductQuantity;
      }
    }
    return total;
  };

  // ShoppingCart 컴포넌트 내에서 주문 페이지로 이동하는 부분
  const orderSelectedItems = () => {
    if (selectedItems.length === 0) {
      alert('주문할 상품을 선택해주세요.');
    } else {
      // 선택된 상품의 정보를 다음 페이지로 전달하고 이동
      const selectedProducts = cartItems.filter((item) => selectedItems.includes(item.productId));
      navigate(`/order`, { state: { selectedProducts, cartItems } });
    }
  };

  return (
    <div className=" bg-white text-black p-4  w-screen">
      <h1 className="text-4xl font-bold mb-4 flex justify-center bg-white text-black ">장바구니</h1>
      <div className="flex flex-col bg-white">
        <span className="flex justify-center bg-white text-black">장바구니-주문서 작성 및 결제-주문 확인</span>
        <button
          onClick={removeFromSelected}
          className="px-4 py-2 mt-4 mb-4  border border-solid border-black w-40 ml-3"
        >
          삭제하기
        </button>
      </div>
      <ul className="border-solid border-t border-b border-black ml-3 bg-white text-black">
        <li className="flex items-center mb-2 bg-white text-black">
          <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} className="mr-2 ml-0" />
          <span onClick={toggleSelectAll} className="bg-white text-black">
            전체 선택
          </span>
        </li>
        {cartItems.map((item) => (
          <li key={item.productId} className="flex items-center mb-2 bg-white text-black">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.productId)}
              onChange={() => toggleItemSelection(item.productId)}
              className="mr-2"
            />
            <img src={item.productRepresentativeImage} alt={item.productTitle} width="100" height="100" />
            <div className="ml-4 bg-white text-black">
              <p className="text-lg font-semibold bg-white text-black">{item.productTitle}</p>
              <p className="text-gray-400 bg-white text-black">가격: {item.productPrice}원</p>
              <p className="text-gray-400 bg-white text-black">수량: {item.cartProductQuantity}</p>

              <button onClick={() => increaseQuantity(item.cartProductQuantity)}>수량증가 </button>
              <button onClick={() => decreaseQuantity(item.cartProductQuantity)}> 수량감소</button>
            </div>
          </li>
        ))}
      </ul>
      <div className=" items-center mt-4  p-4 flex justify-end flex-col border border-solid border-black w-60 ml-auto bg-white text-black">
        <div className="bg-white text-black">
          <p className="mr-4 bg-white text-black ">선택된 상품 합계+{orderTotalPrice()} 원</p>
          <p className="bg-white text-black">배송비 + 3000원</p>
        </div>
        <p className="mr-4 font-bold bg-white text-black">결제 예정 금액= {orderTotalPrice() + 3000}원</p>
        <button onClick={orderSelectedItems} className="bg-black text-white px-4 py-2">
          주문하기
        </button>
      </div>
      <Link to="art" className="bg-white text-black">
        쇼핑 계속하기
      </Link>
    </div>
  );
}

export default ShoppingCart;
