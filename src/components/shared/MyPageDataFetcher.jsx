// MyPageDataFetcher.js
import customAxios from '../../store/customAxios';

const MyPageDataFetcher = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.log("No Fetch My Page Data access token");
        return null;
    }

    const config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    };

    try {
        const response = await customAxios.get(`/api/mypage`, config);
        if (response.data) {
            // Directly return the fetched data
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching my page data', error);
        // Handle the error appropriately
        throw error;
    }
};

export default MyPageDataFetcher;
