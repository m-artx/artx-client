import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 라이브러리를 임포트
import useApiLoader from '../instance/useApiLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleItemSelection,
    toggleSelectAll,
    setCartProductDetails,
    fetchCartData,
    setOrderDetails,
    selectedItems,
} from '../store/cartSlice';
//use param사용해야하는지? cartId 어떻게 가져오는지 고민하기

function ShoppingCart() {
    // 초기 장바구니 상태
    const cartProductDetails = useSelector((state) => state.cart.cartProductDetails) || [];
    const cartId = 25; // 가져오려는 장바구니 ID
    const selectedItems = useSelector((state) => state.cart.selectedItems);
    const selectAll = useSelector((state) => state.cart.selectAll);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin } = useSelector((state) => state.user);
    if (!isLogin) {
        alert('회원 전용 서비스 입니다.');
    }

    //배열에 안담아진다..
    useEffect(() => {
        dispatch(fetchCartData(cartId));
    }, []);

    const increaseQuantity = (productId) => {
        // API 요청을 보내어 서버에서 수량을 증가시킴
        const accessToken = localStorage.getItem('accessToken');
        const request = { productId };
        axios
            .patch(`https://ka8d596e67406a.user-app.krampoline.com/api/cart/increase`, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                const updatedCart = cartProductDetails.content.map((item) => {
                    // 수정된 부분
                    if (item.productId === productId) {
                        return { ...item, cartProductQuantity: item.cartProductQuantity + 1 };
                    }

                    return { ...item };
                });

                dispatch(fetchCartData(cartId)); // 장바구니 데이터를 업데이트

                console.log(updatedCart);
            })

            .catch((error) => {
                alert('수량 증가 중 오류가 발생했습니다.');
            });
    };
    if (Array.isArray(cartProductDetails)) {
        console.log(cartProductDetails);
    } else {
        console.log(cartProductDetails);
    }
    console.log('cartProductDetails:', cartProductDetails);

    const decreaseQuantity = (productId) => {
        // API 요청을 보내어 서버에서 수량을 감소시킴
        const accessToken = localStorage.getItem('accessToken');
        const request = { productId };
        axios
            .patch(`https://ka8d596e67406a.user-app.krampoline.com/api/cart/decrease`, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setCartProductDetails((prevcartProductDetails) => {
                    const updatedCart = prevcartProductDetails.map((item) => {
                        if (item.productId === productId && item.cartProductQuantity > 1) {
                            return { ...item, cartProductQuantity: item.cartProductQuantity - 1 };
                        }
                        return { ...item };
                    });

                    console.log(updatedCart);
                    return updatedCart;
                });
                dispatch(fetchCartData(cartId)); // 장바구니 데이터를 업데이트
            })
            .catch((error) => {
                alert('수량 감소 중 오류가 발생했습니다.');
            });
    };

    // 상품을 선택 또는 해제하는 함수
    const handleToggleItemSelection = (productId) => {
        dispatch(toggleItemSelection(productId));
    };

    const handleToggleSelectAll = () => {
        dispatch(toggleSelectAll());
    };

    //삭제하기
    const removeFromSelected = () => {
        if (selectedItems.length === 0) {
            alert('삭제할 상품을 선택해주세요.');
        } else {
            const confirmDelete = window.confirm('선택한 상품을 삭제하시겠습니까?');

            if (confirmDelete) {
                const updatedCart = cartProductDetails.content.filter(
                    (item) => !selectedItems.includes(item.productId)
                );
                dispatch(setCartProductDetails(updatedCart));
                // setSelectedItems([]); // 선택된 항목을 초기화
            }
        }
    };

    // 선택된 상품을 장바구니에서 제거하는 함수

    // 선택된 상품 합계 계산 함수
    const orderTotalPrice = () => {
        let total = 0;
        if (cartProductDetails && Array.isArray(cartProductDetails.content)) {
            for (const item of cartProductDetails.content) {
                if (selectedItems.includes(item.productId)) {
                    total += item.productPrice * item.cartProductQuantity;
                }
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
            const selectedProducts = cartProductDetails.content.filter((item) =>
                selectedItems.includes(item.productId)
            );
            navigate(`/order`, { state: { selectedProducts } });
        }
    };

    // 데이터 로딩상태 메시지
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <div className=" bg-white text-black p-4 w-[1300px]">
            <h1 className="text-4xl font-bold mb-4 flex justify-center bg-white text-black ">
                장바구니
            </h1>
            <div className="flex flex-col bg-white">
                <span className="flex justify-center bg-white text-black">
                    장바구니-주문서 작성 및 결제-주문 확인
                </span>
                <button
                    onClick={removeFromSelected}
                    className="px-4 py-2 mt-4 mb-4  border border-solid border-black w-40 ml-3"
                >
                    삭제하기
                </button>
            </div>
            <ul className=" border-solid border-t border-b border-black ml-3 bg-white text-black ">
                <li className="flex items-center mb-2 bg-white text-black">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleToggleSelectAll}
                        className="mr-2 ml-0"
                    />
                    <span onClick={handleToggleSelectAll} className="bg-white text-black">
                        전체 선택
                    </span>
                </li>
                {Array.isArray(cartProductDetails.content) &&
                    cartProductDetails.content.map((item) => (
                        <li
                            key={item.productId}
                            className="flex items-center mb-2 bg-white text-black"
                        >
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.productId)}
                                onChange={() => handleToggleItemSelection(item.productId)}
                                className="mr-2"
                                disabled={item.productQuantity === 0}
                            />
                            {item.productName}
                            <img
                                src={item.productRepresentativeImage}
                                alt={item.productTitle}
                                width="100"
                                height="100"
                            />
                            <div className="ml-4 bg-white text-black">
                                <p className="text-lg font-semibold bg-white text-black">
                                    {item.productTitle}
                                </p>
                                <p className="text-gray-400 bg-white text-black">
                                    가격: {item.productPrice}원
                                </p>
                                {item.productQuantity === 0 ? (
                                    <p className="text-red-500 font-bold bg-white text-black">
                                        품절
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-gray-400 bg-white text-black">
                                            수량: {item.cartProductQuantity}
                                        </p>
                                        <button
                                            className="mr-4"
                                            onClick={() => increaseQuantity(item.productId)}
                                            disabled={item.productQuantity === 0} // 품절인 경우 비활성화
                                        >
                                            추가
                                        </button>
                                        <button
                                            onClick={() => decreaseQuantity(item.productId)}
                                            disabled={item.productQuantity === 0} // 품절인 경우 비활성화
                                        >
                                            삭제
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
            </ul>
            {/* 배송비박스 */}
            <div className=" items-center mt-4  p-4 flex justify-end flex-col border border-solid border-black w-60 ml-auto bg-white text-black text-center">
                <div className="bg-white text-black flex flex-col">
                    <p className="mr-4 bg-white text-black ">
                        선택 상품 합계 {orderTotalPrice()} 원
                    </p>
                    <p className="bg-white text-black">(배송비 3000원)</p>
                </div>
                <p className="mr-4 py-2 font-bold bg-white text-black">
                    결제 예정 금액 : {(orderTotalPrice()+3000).toLocaleString()} 원
                </p>

                <button
                    onClick={() => {
                        const isAnyCheckboxChecked =
                            Array.isArray(cartProductDetails.content) &&
                            cartProductDetails.content.some((item) =>
                                selectedItems.includes(item.productId)
                            );
                        if (isAnyCheckboxChecked) {
                            orderSelectedItems();
                        } else {
                            alert('주문할 상품을 선택해주세요.');
                        }
                    }}
                    className="bg-black  px-8 py-2 bg-yellow-300 rounded-lg text-lg"
                >
                결제하기 <div className="bg-yellow-300 text-xs">with kakao</div>
                </button>
            </div>
            <Link to="art" className="bg-white text-black">
                쇼핑 계속하기
            </Link>
        </div>
    );
}

export default ShoppingCart;
