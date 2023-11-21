import React, { useEffect, useState } from 'react';
import customAxios from '../../store/customAxios';

const MyPageDataFetcher = ({fetchedData}) => {
    const [myPageData, setMyPageData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyPageData = async () => {
            
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.log("No Fetch My Page Data access token");
                    return;
                }

                const config = {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                };

                const res = await customAxios.get(`/api/mypage`, config);
                if (res.data) {
                    setMyPageData(res.data);
                    fetchedData(res.data); // Call the callback function with the data
                }
            } catch (error) {
                console.error('Fetch My Page Data Error', error);
                setError(error);
            }
            
        };

        fetchMyPageData();
    }, [fetchedData]);

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    if (!myPageData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Render your My Page data here */}
            <h1>My Page Data</h1>
            {/* Example: <p>{myPageData.someField}</p> */}
        </div>
    );
};

export default MyPageDataFetcher;
