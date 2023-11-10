import { useState, useEffect } from 'react';
import axios from 'axios';

// 이 훅은 API로부터 데이터를 불러와서 반환합니다.
function useApiLoader(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_artx_base_url}${url}`;
        const response = await axios.get(apiUrl);
        setData(response.data);
        console.log('useApiLoader 데이터타입' , typeof(data))
      } catch (error) {
        setError(error);
        console.log('useApiLoader error : ', error)

      } finally {
        // 로딩이 false라면 flase가 반환된다.
        // true라면 구현되는 컴포넌트에서 에러를 띄울 수있게 할수있다.
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // URL이 변경되면 이 훅을 다시 실행합니다.

  return { data, loading, error };
}

export default useApiLoader;
