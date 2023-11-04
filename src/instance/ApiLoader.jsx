import React, { useState, useEffect } from 'react';
import axios from 'axios';

//연동원하는 urㅣ을 넣는다. Url 주소는 env.local 참고

function ApiLoader(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const apiUrl = `${process.env.REACT_APP_artx_base_url}${url}`;
    console.log(apiUrl);

    axios
      .get(apiUrl)
      .then((response) => {
        // API로부터 데이터를 성공적으로 받았을 때 처리할 내용
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // API 호출 중에 오류가 발생했을 때 처리할 내용
        console.error('API 호출 오류:', error);
      });
  }, []);

  // 데이터를 반환
  return data;
}

export default ApiLoader;
