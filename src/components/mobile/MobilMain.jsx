import React from 'react';
import ImageTypeSlider from '../ImageTypeSlider';

function MobilMain() {
  return (
    <div className="flex justify-center flex-col items-center ">
      <div className="flex justify-center flex-col  h-[700px]">
        {/* 도자기사진이 가로세로로돌아가자 */}
        <div className="flex justify-center flex-col items-center text-[40px]  h-[400px] w-[230px] border rounded-[80px]">
          <p className="font-arapey pt-12"> ARTX </p>
          <p className="text-xl">당신의 일상에</p> 
          <p className="text-xl">취향을 담아드립니다</p>
        </div>
      </div>
      <div>
        <div className="flex items-end justify-center border w-screen h-[600px] ">
          <div className="h-[500px] overflow-hidden w-screen flex flex-row" >
            <ImageTypeSlider /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobilMain;
