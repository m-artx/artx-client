import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function Layout() {
  return (
    <div className="flex flex-col items-center h-screen max-w-screen bg-black text-white  border-box font-sans border">
      <div className="flex justify-center h-[140px] max-w-[1500px] min-h-[140px] border">
        <Header />
      </div>
      <div className="flex justify-center  max-w-[1500px]">{<Outlet />}</div>
      {/* Outlet는 중첩된 라우트의 자식 라우트들이 랜더링된다 */}
      <div className="flex items-end justify-center max-w-[1500px]">{/* <Footer /> */}</div>
    </div>
  );
}
