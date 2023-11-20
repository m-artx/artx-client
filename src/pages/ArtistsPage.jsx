import React from 'react';
import ArtistRegistrationPage from './userPages/ArtistRegistrationPage';
import ProductRegistrationPage from './ProductRegistrationPage';
import { useNavigate } from "react-router-dom";



// 작품관리(작품등록 포함)
// 문의관리
// 커미션관리 

function ArtistsPage() {
    const navigate = useNavigate();

    const goToPage = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div>
                작가등록관리
                {/* <ArtistRegistrationPage /> */}
            </div>
            <div onClick={() => goToPage('ArtistRegistration')}>작품등록</div>
            <div>
                주문관리
                <div>배송관리</div>
                <div>작가페이지 관리 및 공지</div>
                <div>커미션 안내 작성 및 커미션 현황</div>
            </div>

            <div>문의관리</div>
            <div>후기모음</div>
        </div>
    );
}

export default ArtistsPage;
