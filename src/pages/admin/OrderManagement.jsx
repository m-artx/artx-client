import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // using moment for handling dates
import axiosInstance from '../../instance/axiosInstance';

const OrderManagement = () => {
    const [dateRange, setDateRange] = useState({
        start: moment().startOf('month').toDate(),
        end: moment().toDate(),
    });
    const [shipments, setShipments] = useState([]);
    const [allShipments, setAllShipments] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const shipmentsPerPage = 10;

    const fetchShipments = async () => {
        try {
            // const startDate = moment(dateRange.start).format('YYYY-MM-DD');
            // const endDate = moment(dateRange.end).format('YYYY-MM-DD');
            const response = await axiosInstance.get(`api/admin/statistics/orders`);
            console.log(response.data);
            setAllShipments(response.data);
        } catch (error) {
            console.error('Error fetching shipments:', error);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, [dateRange]);

    const handlePrevMonth = () => {
        setDateRange({
            start: moment(dateRange.start).subtract(1, 'months').startOf('month').toDate(),
            end: moment(dateRange.start).subtract(1, 'months').endOf('month').toDate(),
        });
    };

    const handleNextMonth = () => {
        setDateRange({
            start: moment(dateRange.start).add(1, 'months').startOf('month').toDate(),
            end: moment(dateRange.start).add(1, 'months').endOf('month').toDate(),
        });
    };

    // 페이지네이션로직
    // const indexOfLastShipment = currentPage * shipmentsPerPage;
    // const indexOfFirstShipment = indexOfLastShipment - shipmentsPerPage;
    // const currentShipments = shipments.slice(indexOfFirstShipment, indexOfLastShipment);
    // const totalPages = Math.ceil(shipments.length / shipmentsPerPage);
    const totalPages = 1;
    // 주문상태
    const formatOrderStatus = (status) => {
        switch (status) {
            case '주문완료':
                return '주문완료';
            case '주문승인':
                return '주문승인';
            case '배송중':
                return '배송중';
            case '배송완료':
                return '배송완료';
            default:
                return 'Unknown';
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="max-w-[1000px] w-screen mx-auto pb-10 flex flex-col justify-center items-center text-white text-lg ">
            <h1 className="text-center text-3xl h-[50px]">주문관리</h1>

            {/* 모든 주문배송정보 */}
            <div className="flex justify-center items-center flex-col pt-10">
                쇼핑몰 전체 내역
                <div className="flex justify-center items-center flex-col border">
                    <div className="flex w-[300px] justify-between items-center my-5 min-h-[10px]">
                        <button onClick={handlePrevMonth} className="border p-2 rounded-lg">
                            어제
                        </button>
                        <span>{moment(dateRange.start).format('MMMM YYYY')}</span>
                        <button onClick={handleNextMonth} className="border p-2 rounded-lg">
                            내일
                        </button>
                    </div>
                    <div className="flex justify-content  ">
                        <div className="text-center mx-10 mb-4">
                            <div className="flex justify-center items-center text-2xl font-bold border rounded-full w-20 h-20">
                                {allShipments.deliveryCompletedCounts}
                            </div>
                            <div>주문완료</div>
                        </div>
                        <div className="text-center mx-10 mb-4">
                            <div className="flex justify-center items-center text-2xl font-bold border rounded-full w-20 h-20">
                                {allShipments.deliveryInProgressCounts}
                            </div>
                            <div>주문승인</div>
                        </div>
                        <div className="text-center mx-10 mb-4">
                            <div className="flex justify-center items-center text-2xl font-bold border rounded-full w-20 h-20">
                                {allShipments.orderApprovalCounts}
                            </div>
                            <div>배송중</div>
                        </div>
                        <div className="text-center mx-10 mb-4">
                            <div className="flex justify-center items-center text-2xl font-bold border rounded-full w-20 h-20">
                                {allShipments.orderSuccessCounts}
                            </div>
                            <div>배송완료</div>  
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping List */}
            {/* ... (shipping list rendering logic) */}

            {/* Pagination */}
            <div className="flex justify-center p-4">
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${
                            currentPage === number + 1 ? 'bg-blue-500 text-white' : ''
                        }`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default OrderManagement;
