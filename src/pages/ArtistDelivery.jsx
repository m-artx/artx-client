import React, { useState, useEffect } from 'react';
import instance from '../store/customAxios';

function ArtistDelivery() {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await instance.get('/api/orders', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                setOrderData(response.data.content);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="bg-white text-black w-screen">

            <h1 className="flex justify-center text-5xl bg-white text-black">배송관리</h1>


            <ul>
                {orderData.map((order) => {
                    const orderDate = Object.keys(order)[0];
                    const orderDetails = order[orderDate];

                    return (

                        <li key={orderDetails.orderId} className="bg-white text-black border border-gray-300 p-4 my-2">
                            <span className="font-bold text-black">{orderDetails.username}</span>
                            <div className="mt-2">
                                <p className="text-gray-600 bg-white">주문 날짜: {orderDetails.orderCreatedAt}</p>
                                <p className="text-gray-600 bg-white">주문 상태: {orderDetails.orderStatus}</p>
                                <p className="text-lg font-semibold bg-white">{orderDetails.orderTotalAmount}원</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ArtistDelivery;
