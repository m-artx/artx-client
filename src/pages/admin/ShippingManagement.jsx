import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // using moment for handling dates
import axiosInstance from '../../instance/axiosInstance';

const ShippingManagement = () => {
 

    return (
        <div className="max-w-[1000px] w-screen mx-auto pb-10 flex flex-col justify-center">
         
        </div>
    );
};
export default ShippingManagement;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../instance/axiosInstance';
// import moment from 'moment'; // for handling dates

// const ShippingManagement = () => {
//     const [orders, setOrders] = useState([]);
//     const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));
//     const [currentPage, setCurrentPage] = useState(1);
//     const ordersPerPage = 10;

//     // Fetch orders
//     const fetchOrders = (month) => {
//         axiosInstance.get(`/api/admin/statistics/orders?month=${month}`)
//             .then(response => {
//                 setOrders(response.data);
//                 // handle pagination here if necessary
//             })
//             .catch(error => console.error('Error:', error));
//     };

//    useEffect(() => {
//     fetchUsers();
// }, [searchTerm, currentPage, fetchUsers]); // Include fetchUsers as a dependency

// useEffect(() => {
//     fetchNewUsersCount();
// }, [fetchNewUsersCount]); // Include fetchNewUsersCount as a dependency

// useEffect(() => {
//     filterUsers(allUsers, 1); // Reset to page 1 on new search
// }, [searchTerm, allUsers, filterUsers]); // Include allUsers and filterUsers as dependencies
//     // Handle month change
//     const handleMonthChange = (direction) => {
//         const newMonth = moment(currentMonth).add(direction, 'months').format('YYYY-MM');
//         setCurrentMonth(newMonth);
//     };

//     // Pagination
//     const paginateOrders = (page) => {
//         // logic to paginate orders
//     };

//     return (
//         <div className="shipping-management">
//             <h1>Delivery Management</h1>
//             <div className="date-selector">
//                 <button onClick={() => handleMonthChange(-1)}>Previous Month</button>
//                 <span>{currentMonth}</span>
//                 <button onClick={() => handleMonthChange(1)}>Next Month</button>
//             </div>

//             <div className="order-list">
//                 {orders.map(order => (
//                     <div key={order.id} className="order-item">
//                         <span>{order.orderNumber}</span>
//                         <span>{order.orderDate}</span>
//                         <span>{order.orderStatus}</span>
//                         <span>{order.trackingNumber || 'Unregistered'}</span>
//                         <button>Edit</button>
//                     </div>
//                 ))}
//             </div>

//             <div className="pagination">
//                 {/* Pagination buttons */}
//             </div>
//         </div>
//     );
// };

// export default ShippingManagement;
