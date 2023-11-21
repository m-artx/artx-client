//customAxios
import axios from 'axios';
import { REACT_APP_ARTX_BASE_URL } from '../utils/env';

const url = REACT_APP_ARTX_BASE_URL;
// const url = 'https://ka8d596e67406a.user-app.krampoline.com'

// axios의 create 메서드를 사용하여 새로운 axios instance를 생성한다.
// 이 인스턴스는 특정한 구성 옵션을 가지고 있으며 나중에 http요청을 보낼 때 이 구성을 사용한다.
const instance = axios.create({
   baseURL: url,
   withCredentials: true, 
   //CORS 관련이다 허용할거냐 안할거냐를 세팅하는부분
   //모든 도메인 다 와일드 카드 상태
   //false로 해도 괜찮은건지? 
   //크램폴린이라서 이런건지?

   // baseUrl axios 인스턴스 구성 중 하나로 이 인스턴스에 보내는 모든 요청의 기본 url 주소를 설정한다
   // withCredentials axios 인스턴스 구성 중 하나로 요청에 자격 증명(쿠키, 인증 등)을 포함시킬지 여부를 설정한다
   // 이부분을 사용하는건 필수는 아니다..

    // baseUrl axios 인스턴스 구성 중 하나로 이 인스턴스에 보내는 모든 요청의 기본 url 주소를 설정한다
    // withCredentials axios 인스턴스 구성 중 하나로 요청에 자격 증명(쿠키, 인증 등)을 포함시킬지 여부를 설정한다
});

// 생성한 Axios인스턴스를 다른 파일에서 재사용할 수 있도록 내보낸다.
export default instance;

//axios를 사용하여 API 서버와의 통신을 더 간편하게 쓸 수 있도록 한것이다.
