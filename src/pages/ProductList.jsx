import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Search from '../components/shared/Search';
import useApiLoader from '../instance/useApiLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import instance from '../instance/instance';
import customAxios from '../store/customAxios';

function ProductList() {
    let { productCategory } = useParams();
    let apiUrl;

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    // productCategory에 따라 apiUrl 변경
    if (productCategory === 'PAINT') {
        apiUrl = '/api/products?category=PAINT&';
    } else if (productCategory === 'CERAMIC') {
        apiUrl = '/api/products?category=CERAMIC';
    } else if (productCategory === 'ETC') {
        apiUrl = '/api/products?category=ETC';
    } else if (productCategory === 'ALL') {
        apiUrl = '/api/products';
    }

    // if (productCategory === 'ALL')
    // 데이터 로딩 훅
    // const { data: apiData, loading, error } = useApiLoader(apiUrl);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (productCategory === 'ALL') {
                    response = await customAxios.get(`/api/products`);
                } else {
                    response = await customAxios.get(`/api/products?category=${productCategory}`);
                }

                setData(response.data.content);
            } catch (error) {
                console.error('API 호출 오류:', error);
            }
        };

        fetchData();
    }, [apiUrl]);
    // 페이지네이션용
    const itemsPerPage = 8; // 한페이지당 이미지숫자
    const [currentPage, setCurrentPage] = useState(1); // 현재페이지

    // 데이터 나누는 부분
    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

    // 인덱스 계산부분
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 인덱스 자름
    // const currentItems = data && data.content ? data.content.slice(indexOfFirstItem, indexOfLastItem) : [];
    const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

    // 페이지 앞뒤버튼 함수들
    const nextPage = () => {
        setCurrentPage((currentPage) => (currentPage < totalPages ? currentPage + 1 : 1));
    };
    const prevPage = () => {
        setCurrentPage((currentPage) => (currentPage > 1 ? currentPage - 1 : totalPages));
    };


    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 데이터 로딩상태 메시지
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    const goToProductDetail = (id) => {
        navigate(`/productdetail/${id}`);
    };

    return (
        <div className="w-screen  max-w-[1300px] -blue-600 flex flex-col ">
            <div className="text-center">
                <div className="text-3xl sm:text-8xl font-medium ">{productCategory}</div>
                <Search />
                <section className=" -red-600 flex flex-wrap justify-center p-3">
                    {currentItems.map((item, index) => (
                        <div key={index} className=" w-[200px] h-[300px] flex flex-col m-8 mt-10 ">
                            <img
                                src={item.productRepresentativeImage}
                                alt={`Product ${item.productName}`}
                                className=" rounded-md object-cover [200px] h-[300px] "
                                onClick={() => goToProductDetail(item.productId)}
                            />
                            <div className="flex justify-around border-b border-gray-700 py-2 mx-1">
                                <p>{item.productTitle}</p>
                                <p>{item.productPrice.toLocaleString()} </p>
                            </div>
                        </div>
                    ))}
                </section>
                {/* Pagination with page numbers */}
                <div className="flex justify-center items-center mt-10">
                    <button className="px-10 transform hover:scale-110" onClick={prevPage}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size="2x"
                            style={{ color: '#c7c7c7' }}
                        />
                    </button>

                    {/* Page Numbers */}
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            className={`mx-1 px-3 py-1  rounded ${
                                currentPage === number ? 'text-white bg-gray-600' : 'text-gray-700'
                            }`}
                            onClick={() => goToPage(number)}
                        >
                            {number}
                        </button>
                    ))}

                    <button className="px-10 transform hover:scale-110" onClick={nextPage}>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            size="2x"
                            style={{ color: '#c7c7c7' }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
