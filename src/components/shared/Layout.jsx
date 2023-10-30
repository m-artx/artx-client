import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout() {
  return (
    <div
      className="flex flex-col items-center h-screen w-screen bg-black text-white overflow-hidden 
    font-sans relative "
    >
      <div>
        <Header />
      </div>
      <div>{<Outlet />}</div>
      {/* Outlet는 중첩된 라우트의 자식 라우트들이 랜더링된다 */}
      <div className="absolute">
        <Footer />
      </div>
    </div>
  );
}
