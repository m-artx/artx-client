import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout() {
    return (
        <div className="flex flex-col items-center h-screen max-w-screen text-white  border-box font-sans  text-md">
            <div className="flex justify-center h-[140px] max-w-[1500px] min-h-[140px] border-b">
                <Header />
            </div>
            <div className="flex justify-center h-screen-140  ">
               {<Outlet />}
               </div>
            <div className="flex justify-center max-w-[1500px]">
                {/* <Footer /> */}
            </div>
        </div>
    );
}
