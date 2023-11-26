import React from 'react';
import { useNavigate } from 'react-router-dom';




function AdminPage() {
    const navigate = useNavigate();

    const goToPage = (path) => {
        navigate('/' + path);
    };
    return (
        <div className="bg-white text-black shadow-lg w-[1000px] pb-20 flex flex-col">
            <h1 className="text-center border text-3xl bg-white text-black">관리자센터</h1>
            <div className="mb-4 bg-white w-[300px] text-black flex flex-col justify-center mx-auto">
                <button className="bg-white text-black py-2 mt-4 border" onClick={() => goToPage('artistmanagement')}>
                    작가전환관리
                </button>
                <button className="bg-white text-black py-2 mt-4 border" onClick={() => goToPage('ordermanagement')}>
                    주문관리
                </button>
                <button className="bg-white text-black py-2 mt-4 border" onClick={() => goToPage('shippingmanagement')}>
                    배송관리
                </button>
                <button className="bg-white text-black py-2 mt-4 border" onClick={() => goToPage('usermanagement')}>
                    회원관리
                </button>
                <button className="bg-white text-black py-2 mt-4 border" onClick={() => goToPage('announcementmanagement')}>
                    공지사항 관리
                </button>
            </div>
        </div>
    );
}
export default AdminPage;
