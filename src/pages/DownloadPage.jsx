import React from 'react';
import Header from '../components/Header';

function DownloadPage() {
  const ceramic =
    'https://cdn.discordapp.com/attachments/1166626513005854731/1166663182241251398/StockSnap_5AGZX1ZSDQ.jpg?ex=654b4ec2&is=6538d9c2&hm=3173f33546b99f243d6bb9c040a4dd0db8ee640bec164dbb763f1111d5723d7b&';

  return (
    <div className="sm:w-full">
      <img src={ceramic} alt="이미지 설명" className="w-full shadow-lg" />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center">
        <p className="sm:w-auto text-sm sm:text-xl text-white ">
          현업 작가, 작가 지망생들과 예술에 목마른 소비자를 위한
        </p>

        <h1 className="sm:w-auto text-4xl sm:text-4 lg:text-px-6 xl:text-10xl text-white mb-6 pb-3">'만남공간'</h1>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
          <button className="sm:w-auto px-6 sm:px-4 lg:px-6 xl:px-12 sm:py-4 lg:py-5 xl:py-6 bg-gray-300 text-black text-sm sm:text-sm xl:text-4xl rounded-full hover:bg-black hover:text-white transition duration-300">
            App Store
          </button>
          <button className="sm:w-auto px-6 sm:px-4 lg:px-6 xl:px-12 sm:py-4 lg:py-5 xl:py-6 bg-gray-300 text-black text-sm sm:text-sm xl:text-4xl rounded-full hover:bg-black hover:text-white transition duration-300">
            Goolge Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;
