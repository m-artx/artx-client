import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import Search from '../components/shared/Search';
import Slider1 from '../components/Slider1';
import Slider2 from '../components/Slider2';
import CategorySlider from '../components/CategorySlider';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; //디스패치로 저장하고 셀렉터로 가져온다
import Footer from "../components/Footer";

function MainPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    // const userInfo = useSelector((state) => state.cart);
    const navigate = useNavigate();

    //현재상태만알려준다
    // console.log(userInfo);

    let { productCategory } = useParams();

    let apiUrl;
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setData([]);
        } else {
            searchData(searchTerm);
        }
    }, [searchTerm]);

    const searchData = async (searchTerm) => {
        try {
            const response = await Axios.get(
                `https://ka8d596e67406a.user-app.krampoline.com/api/products/search`,
                {
                    params: {
                        searchTerm: searchTerm,
                    },
                }
            );
            setData(response.data.productTitle);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
            setData([]);
        }
    };

    // Modify the handleSearch function to accept the new search term
    const handleSearch = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    return (
        <div className="flex items-center flex-col  max-w-[1300px] text-[18px]">
            <div className="flex flex-col items-center justify-center  -blue-700 max-w-[1300px] ">
                <div className=" w-[1300px] ">
                    <div className="  pt-2 flex flex-col justify-center items-center  ">
                        <p className="p-3">인기 작가:新作</p>
                        <div className="w-[80%] h-[310px]">
                            <Slider1 />
                        </div>
                    </div>
                    <div className="  pt-2 flex flex-col justify-center items-center ">
                        <p className="p-3 pb-8">신인 작가:作</p>
                        <div className="w-[80%]  h-[310px]">
                            <Slider2 />
                        </div>
                    </div>
                    <div className=" w-[1300px]">
                        <div className="flex flex-col w-full items-center pt-2  yellow-purple-800 overflow-hidden h-[500px]  ">
                            <p className="pt-10 pb-8">둘러보기</p>
                            <div className="flex w-screen justify-center mb-10 text-sm">
                                <CategorySlider />
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
