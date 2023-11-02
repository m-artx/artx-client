import React from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ArtPage() {
  const imageList = [
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 1',
      name: 'name',
      price: 10000,
      id: 0,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 2',
      name: 'name',
      price: 15000,
      id: 1,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 3',
      name: 'name',
      price: 12000,
      id: 2,
    },
    {
      url: 'https://dummyimage.com/723x403',
      title: 'Title 4',
      name: 'name',
      price: 8000,
      id: 3,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 5',
      name: 'name',
      price: 10000,
      id: 4,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 6',
      name: 'name',
      price: 15000,
      id: 5,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 7',
      name: 'name',
      price: 12000,
      id: 6,
    },
    {
      url: 'https://dummyimage.com/723x403',
      title: 'Title 8',
      name: 'name',
      price: 8000,
      id: 7,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 5',
      name: 'name',
      price: 10000,
      id: 8,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 6',
      name: 'name',
      price: 15000,
      id: 9,
    },
    {
      url: 'https://dummyimage.com/720x400',
      title: 'Title 7',
      name: 'name',
      price: 12000,
      id: 10,
    },
    {
      url: 'https://dummyimage.com/723x403',
      title: 'Title 8',
      name: 'name',
      price: 8000,
      id: 11,
    },
  ];

  const itemsPerPage = 8; // 한 페이지당 보여줄 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const totalPages = Math.ceil(imageList.length / itemsPerPage);

  // 다음 페이지로 이동하는 함수
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      // 다음 페이지가 없는 경우 첫 페이지로 돌아가도록 설정
      setCurrentPage(1);
    }
  };

  // 이전 페이지로 이동하는 함수
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      // 첫 페이지에서 이전 버튼을 누르면 마지막 페이지로 이동
      setCurrentPage(totalPages);
    }
  };

  // 현재 페이지에 표시할 이미지 목록을 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImageList = imageList.slice(startIndex, endIndex);

  const imageComponents = currentImageList.map((image, index) => (
    <div className="xl:w-1/4 md:w-1/2 sm:w-1/2 p-4 mb-8 mx-auto relative group" key={index}>
      <div className="bg-gray-100 mx-auto overflow-hidden shadow-md transform transition-transform hover:scale-105 cursor-pointer">
        <img className="h-28 w-full object-cover object-center mb-6" src={image.url} alt="content" />
        <h3 className="tracking-widest text-black text-s font-medium title-font ml-3 hover:font-bold">{image.title}</h3>
        <p className="sm:text-sm  mb-4 ml-3 ">{image.name}</p>
        <p className="leading-relaxed text-base ml-3 ">₩{image.price}</p>
      </div>
    </div>
  ));

  return (
    <div>
      <section className="text-gray-600 body-font mx-auto">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap w-full mb-10 sm:mb-20">
            <div className="w-1/2 mx-auto mb-6 lg:mb-0 text-center">
              <h1 className="text-8xl sm:text-8xl font-medium title-font mb-2 text-white">WORK</h1>
              <div className="flex items-center border-solid border-2 border-neutral-950 p-3 rounded-full w-800 bg-white">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                <input className="w-full bg-transparent outline-none" type="text" placeholder="검색어를 입력하세요" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="mr-10 transform hover:scale-110" onClick={prevPage}>
              <FontAwesomeIcon icon={faArrowLeft} size="2xl" style={{ color: '#c7c7c7' }} />
            </button>
            <Link to="product">
              <div className="flex flex-wrap -m-4 justify-center">{imageComponents}</div>
            </Link>
            <button className="ml-10 transform hover:scale-110" onClick={nextPage}>
              <FontAwesomeIcon icon={faArrowRight} size="2xl" style={{ color: '#c7c7c7' }} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArtPage;
