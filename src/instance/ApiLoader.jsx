import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApiLoader() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_artx_base_url}${process.env.REACT_APP_artx_base_main}`;
    const request = { userId: '35a69652-6a41-4372-9f1b-0b32215e8af7' };
    console.log(apiUrl);

    axios
      .post(apiUrl, request)
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
