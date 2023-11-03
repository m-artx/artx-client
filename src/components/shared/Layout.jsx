import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function Layout() {
  return (
    <div
<<<<<<< HEAD
      className="flex flex-col items-center h-screen w-screen bg-black text-white border box-border
    font-sans"
    >
=======
      className="flex flex-col items-center h-screen max-w-screen bg-black text-white  border-box font-sans">
>>>>>>> aad94df38114e103e5c41cf14f2e2dce10180775
      <div className="flex justify-center max-w-[1500px]">
        <Header />
      </div>
      <div className="flex justify-center  max-w-[1500px]">
        {<Outlet />}
        </div>
      {/* Outlet는 중첩된 라우트의 자식 라우트들이 랜더링된다 */}
<<<<<<< HEAD
      <div className="flex items-end  justify-center max-w-[1500px]">{/* <Footer /> */}</div>
=======
      <div className="flex items-end justify-center max-w-[1500px]">
        {/* <Footer /> */}
      </div>
>>>>>>> aad94df38114e103e5c41cf14f2e2dce10180775
    </div>
  );
}
