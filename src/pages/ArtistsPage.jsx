import React from 'react';
import ArtistRegistrationPage from './userPages/ArtistRegistrationPage';
import ProductRegistrationPage from './ProductRegistrationPage';

function ArtistsPage() {
    return (
        <div>
            <div>
                작가등록관리
                {/* <ArtistRegistrationPage /> */}
            </div>
            <div>
                작품등록
                {/* <ProductRegistrationPage /> */}
            </div>
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
