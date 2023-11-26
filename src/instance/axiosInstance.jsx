//axiosInstance.jsx 파일
import { REACT_APP_ARTX_BASE_URL } from '../utils/env';

// axios 요청 전에 인터셉터 이용하여 토큰유효성을 점검하고 토큰이 없으면 reissue받는다.
// Axios 응답 인터셉터를 사용하여 서버로부터의 응답을 처리하거나 에러를 관리
// 서버 응답에서 401 또는 403 오류(권한 없음)가 발생하면, 토큰을 재발급 받는 로직을 실행
// 서버 응답이 400 오류이고, "REFRESH_TOKEN_NOT_FOUND" 오류가 아닌 경우, 오류 메시지를 표시

// 프로필사진 post요청등에 사용하면 엑서스토큰을 자동으로 포함시켜서 보내주는가?
// axiosInstance를 사용해서 요청을 보낸다면 헤더에 'Bearer ${token}' 형식으로 토큰이 추가된다.

// 

import axios from 'axios';

//인스턴스만듬
const instance = axios.create({
    baseURL: REACT_APP_ARTX_BASE_URL,
    withCredentials: false,
});

function accessToken() {
    return localStorage.getItem('accessToken');
}

// 인터셉터 자바에도있다. 모든엑시오스요청 하기 전,후에 실행. 현재같은경우 토큰세팅이다
// 아래같은경우에는 요청을 보내기전에 토큰을 헤더에세팅
// (개발자도구네트워크창)헤더란 편지쓸때 큰분류로 어떤요청인지 전반적인 개요를 담고있다 리스폰스에서오는..
// (개발자도구네트워크창)페이로드란 요청을 보낼때 특정값 호출을위해 값을 바디나 파라미터에 담아서 보내는데 내가넣은 값이 보이는 부분이다.

instance.interceptors.request.use(
    async (config) => {
        const token = accessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//리이슈토큰 발급 및 에러체크
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const errorResponse = error.response;

        if (errorResponse) {
            if (errorResponse.status === 401 || errorResponse.status === 403) {
                try {
                    //
                    localStorage.removeItem('accessToken');
                    const reissueResponse = await instance.post('/api/auth/reissue');
                    if (reissueResponse) {
                        console.log(reissueResponse.data);
                        const newAccessToken = reissueResponse.data.accessToken.value;
                        localStorage.setItem('accessToken', newAccessToken);
                        if (error.config) {
                            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            instance.request(error.config).then(() => {
                                // store.commit("setLogin", true);
                            });
                        }
                    }
                } catch (error) {
                    alert(error);
                    return Promise.reject(error);
                }
            } else if (errorResponse.status === 400 && errorResponse.data) {
                if (!(errorResponse.data.error === 'REFRESH_TOKEN_NOT_FOUND')) {
                    alert(errorResponse.data?.error);
                    return Promise.reject(error);
                }
            }
        }
    }
);
export default instance;
/**
 *Response Interceptors*
Status Code
401 UNAUTHORIZED: 권한이 없는 경우(Access Token이 존재하지만 만료된 경우 또는 Authorization과 함께 공백이 가는 경우)
400 BAD_REQUEST: Refresh Token이 존재하지 않을 때
*
EndPoint
토큰 재발급: /api/auth/reissue
**/
