import React from 'react';
import ArtistRegistrationPage from './userPages/ArtistRegistrationPage';
import ProductRegistrationPage from './ProductRegistrationPage';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ArtistsPage() {
    const navigate = useNavigate();

    const goToPage = (path) => {
        navigate(path);
    };

    return (
        <div className="container mx-auto p-8">
            <div className="mb-8 border-b border-gray-300 pb-4">
                <Link to="/artistRegistration">
                    <h2 className="text-2xl font-bold mb-4">작가등록관리</h2>
                    {/* <ArtistRegistrationPage /> */}
                </Link>
            </div>
            <div className="mb-8 border-b border-gray-300 pb-4">
                <Link to="/productregistration">
                    <h2 className="text-2xl font-bold mb-4">작품등록</h2>
                    {/* <ProductRegistrationPage /> */}
                </Link>
            </div>
            <div className="mb-8 border-b border-gray-300 pb-4">
                <h2 className="text-2xl font-bold mb-4">작가 주문관리</h2>
                <ul className="list-disc pl-4">
                    <Link to="/artistdelivery">
                        <li>배송관리</li>
                    </Link>
                    <Link to="/ArtistProfile">
                        <li>작가페이지 관리 및 공지</li>
                    </Link>
                    <li>커미션 안내 작성 및 커미션 현황</li>
                </ul>
            </div>
            {/* <div className="mb-8 border-b border-gray-300 pb-4">
                <Link to="/inquirymanagement">
                    <h2 className="text-2xl font-bold mb-4">문의관리</h2>
                </Link>
            </div> */}
            {/* <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">후기모음</h2>
            </div> */}
        </div>
    );
}

export default ArtistsPage;
