import axios from 'axios';
import { REACT_APP_ARTX_BASE_URL } from "../utils/env"

const url = REACT_APP_ARTX_BASE_URL;

// axios의 create 메서드를 사용하여 새로운 axios instance를 생성한다.
// 이 인스턴스는 특정한 구성 옵션을 가지고 있으며 나중에 http요청을 보낼 때 이 구성을 사용한다.
const instance = axios.create({
   baseURL: url,
   withCredentials: true,

   // baseUrl axios 인스턴스 구성 중 하나로 이 인스턴스에 보내는 모든 요청의 기본 url 주소를 설정한다
   // withCredentials axios 인스턴스 구성 중 하나로 요청에 자격 증명(쿠키, 인증 등)을 포함시킬지 여부를 설정한다

});

// 생성한 Axios인스턴스를 다른 파일에서 재사용할 수 있도록 내보낸다.
export default instance;

//axios를 사용하여 API 서버와의 통신을 더 간편하게 쓸 수 있도록 한것이다.