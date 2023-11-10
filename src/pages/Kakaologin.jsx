import React from 'react';
export default function Kakaologin() {
   const Rest_api_key = '54de10531635207bf7cf51d54368d517'; //REST API KEY
   const redirect_uri = 'http://localhost:3000/auth'; //Redirect URI
   // oauth 요청 URL
   const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
   const handleLogin = () => {
      window.location.href = kakaoURL;
   };
   return (
      <>
         <button onClick={handleLogin}>
            <img
               src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png"
               alt=""
            />
         </button>
      </>
   );
}
