import React from 'react';
import NoticePage from './NoticePage';

function CustomerCenter() {
    return (
        <div className=" ">
            <div className="border w-[500px] h-[300px]">
                <NoticePage />
            </div>
            <div className="border w-[500px] h-[500px]">
              자주묻는질문</div>
        </div>
    );
}

export default CustomerCenter;
