import React from 'react';

function AdminPage() {
    return (
        <div className="container mx-auto p-8">
            <div className="mb-8 border-b border-gray-300 pb-4">
                <h2 className="text-2xl font-bold mb-4">작가관리</h2>
                {/* 작가 관리 컴포넌트 추가 */}
            </div>
            <div className="mb-8 border-b border-gray-300 pb-4">
                <h2 className="text-2xl font-bold mb-4">메인화면 관리</h2>
                {/* 메인화면 관리 컴포넌트 추가 */}
            </div>
            <div className="mb-8 border-b border-gray-300 pb-4">
                <h2 className="text-2xl font-bold mb-4">공지사항 작성 및 관리</h2>
                {/* 공지사항 작성 및 관리 컴포넌트 추가 */}
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">기타 운영사항</h2>
                {/* 기타 운영사항 컴포넌트 추가 */}
            </div>
        </div>
    );
}

export default AdminPage;
