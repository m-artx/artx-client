import React, { useEffect } from 'react';
import axios from 'axios';

const KakaoFail = () => {
    useEffect(() => {
        const handlePaymentFail = async () => {
            try {
                // API 엔드포인트와 필요한 데이터를 적절히 수정하세요.
                const response = await axios.post(`http://ka8d596e67406a.user-app.krampoline.com/api/payments/fail`, {
                    // 다른 필요한 데이터들을 추가하세요.
                });

                // 성공적인 응답을 받았을 때 수행할 작업
                console.log('결제 실패 API 요청 성공:', response.data);
            } catch (error) {
                // API 요청 중 에러가 발생했을 때 수행할 작업
                console.error('결제 실패 API 요청 에러:', error);
            }
        };

        // 컴포넌트가 마운트될 때 결제 실패 API 요청 수행
        handlePaymentFail();
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 설정

    return <div>결제 실패</div>;
};

export default KakaoFail;
