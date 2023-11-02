import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Anycom() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // API 엔드포인트 URL을 여기에 넣어주세요.
    const apiUrl = 'http://123.108.166.72:8080/api/products';
    const request = { userId: '35a69652-6a41-4372-9f1b-0b32215e8af7' };

    axios
    //재영님 400에러난다했는데 아래 get을 post로 하니까 됨!
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

  return (
    <div>
      {/* API에서 받아온 데이터를 여기에서 사용할 수 있습니다. */}
      {/* 예를 들어, data를 매핑하여 데이터를 출력하거나 가공할 수 있습니다. */}
    </div>
  );
}

export default Anycom;
