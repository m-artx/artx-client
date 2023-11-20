//axiosInstance.js 파일

// 인스턴스 생성
// 액서스 토큰 저장
// 모든 요청 전에 측정 로직을 실행
// accessToken 함수를 호출하여 토큰을 가져온 다음, 이 토큰을 요청 헤더의 "Authorization"에 "Bearer" 토큰으로 추가
// Axios 응답 인터셉터를 사용하여 서버로부터의 응답을 처리하거나 에러를 관리
// 서버 응답에서 401 또는 403 오류(권한 없음)가 발생하면, 토큰을 재발급 받는 로직을 실행
// 서버 응답이 400 오류이고, "REFRESH_TOKEN_NOT_FOUND" 오류가 아닌 경우, 오류 메시지를 표시

//이 코드는 로그인 후 발급되는 JWT 액세스 토큰을 사용하여 API 요청을 보낼 때, 토큰이 만료되었거나 유효하지 않을 경우 자동으로 토큰을 재발급 받고 요청을 다시 시도하는 로직을 구현합니다. 또한, 특정 오류 상황에서 사용자에게 알림을 제공합니다.

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ARTX_BASE_URL,
  withCredentials: true,
});

function accessToken() {
  return localStorage.getItem("accessToken");
}

//Request Interceptors 요청 가로채기?
instance.interceptors.request.use(
  async (config) => {
    const token = accessToken();
    console.log('Request URL:', config.url);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const errorResponse = error.response;

      if (errorResponse) {
        if (errorResponse.status === 401 || errorResponse.status === 403) {
          try {
            //
            localStorage.removeItem("accessToken");
            const reissueResponse = await instance.post("/api/auth/reissue");
            if(reissueResponse){
              console.log(reissueResponse.data);
              const newAccessToken = reissueResponse.data.accessToken.value;
              localStorage.setItem("accessToken", newAccessToken);
              if (error.config) {
                error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                  instance.request(error.config).then(() => {
                    // store.commit("setLogin", true);
                  })
                }
              }
            } catch(error) {
              alert(error)
              return Promise.reject(error);

          }
        } else if(errorResponse.status === 400 && errorResponse.data) {
          if(!(errorResponse.data.error === 'REFRESH_TOKEN_NOT_FOUND')){
            alert(errorResponse.data?.error)
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