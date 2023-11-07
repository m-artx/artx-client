import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';

function ArtSearch() {
  return (
    <div className="border">
      <div className="flex flex-wrap w-full mb-10 sm:mb-20">
        <div className="w-1/2 mx-auto mb-6 lg:mb-0 text-center">
          <h1 className="text-3xl sm:text-8xl font-medium title-font mb-2 text-white">전체작품</h1>
          <div className="flex items-center border-solid border-2 border-neutral-950 p-3 rounded-full w-800 bg-white">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            <input className="w-full bg-transparent outline-none" type="text" placeholder="검색어를 입력하세요" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtSearch;
