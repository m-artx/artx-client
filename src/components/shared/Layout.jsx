import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen    border-box font-sans border-blue-500 max-w-[1300px] border">
      <div className="flex justify-center h-[140px] border">
        <Header />
      </div>
      <div className="flex-1 justify-center border border-blue-500
      bg-yellow-200 h-screen-140  ">
        {<Outlet />}
        </div>
      {/* Outlet는 중첩된 라우트의 자식 라우트들이 랜더링된다 */}
      {/* <div className="flex items-end justify-center max-w-[1300px]"><Footer /></div> */}
    </div>
  );
}
