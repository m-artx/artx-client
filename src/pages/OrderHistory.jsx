import React, { useState, useEffect } from 'react';

function OrderHistory() {
  // 더미 주문 내역 데이터 (백엔드에서 실제 데이터를 가져와 사용하세요)
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderDate: '2023-01-15',
      products: [
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
      ],
      status: '배송 중',
    },
    {
      id: 2,
      orderDate: '2023-02-10',
      products: [
        {
          id: 3,
          name: '상품 3',
          price: 800,
          quantity: 3,
          imageUrl: 'https://og-data.s3.amazonaws.com/media/artstory/post_image/20/2.jpg',
        },
      ],
      status: '배송 완료',
    },
  ]);

  // 배송 중 상태의 주문 개수 계산
  const ordersInTransit = orders.filter((order) => order.status === '배송 중').length;

  // 배송 완료 상태의 주문 개수 계산
  const completedOrders = orders.filter((order) => order.status === '배송 완료').length;

  // 주문 내역의 총 합계 가격 계산
  const totalOrderPrice = orders.reduce((total, order) => {
    return (
      total +
      order.products.reduce((subtotal, product) => {
        return subtotal + product.price * product.quantity;
      }, 0)
    );
  }, 0);

  // 배송 조회 기능을 가진 함수
  const handleTrackOrder = (orderId) => {
    // 이 곳에 실제 배송 조회 기능을 구현할 수 있습니다.
    alert(`주문 번호 ${orderId}의 배송 조회 기능을 구현하세요.`);
  };

  return (
    <div className="bg-white text-black w-screen">
      <h1 className="flex justify-center text-5xl">My page</h1>
      <span className="font-bold flex justify-center text-4xl">홍길동 님</span>
      <h1 className="text-2xl font-bold">주문/배송 내역</h1>
      <div className="flex justify-between">
        <p>배송 중: {ordersInTransit}건</p>
        <p>배송 완료: {completedOrders}건</p>
      </div>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-4">
            <div className="bg-white p-4 shadow-md">
              <p className="text-lg font-bold">주문일자: {order.orderDate}</p>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    <div className="flex items-center m-2">
                      <img src={product.imageUrl} alt={product.name} width="180" height="100" className="mr-4" />
                      <div>
                        <p>
                          {product.name} - 가격: {product.price}원, 수량: {product.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p>주문 상태: {order.status}</p>
              {order.status === '배송 중' && (
                <button
                  className="border border-solid border-black text-black px-4 py-2"
                  onClick={() => handleTrackOrder(order.id)}
                >
                  배송 조회
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p>주문 내역의 총 합계 가격: {totalOrderPrice}원</p>
    </div>
  );
}

export default OrderHistory;
