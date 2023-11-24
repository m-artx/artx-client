import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function InquiryManagement() {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        // 저장된 데이터를 불러와서 상태에 설정
        const storedData = JSON.parse(localStorage.getItem('inquiryFormData')) || [];
        setFormData(storedData);
    }, []);

    const handleDelete = (index) => {
        // 선택한 인덱스의 데이터를 배열에서 제거
        const updatedData = [...formData];
        updatedData.splice(index, 1);

        // 로컬 스토리지에서도 해당 데이터 제거
        localStorage.setItem('inquiryFormData', JSON.stringify(updatedData));

        // 상태 업데이트
        setFormData(updatedData);
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md text-black">
            <h1 className="text-3xl font-bold mb-4 bg-white text-black">문의내역</h1>
            {formData.map((data, index) => (
                <div key={index} className="mb-4 bg-white text-black">
                    <h2 className="text-xl font-semibold bg-white text-black">{data.title}</h2>
                    <p className="bg-white text-black">{data.message}</p>
                    {data.file && (
                        <div className="mt-2 ">
                            <p className=" bg-white text-black">첨부 파일: {data.file}</p>
                        </div>
                    )}
                    <button
                        onClick={() => handleDelete(index)}
                        className="mt-2 px-2 py-1 bg-black text-white rounded-md"
                    >
                        삭제
                    </button>
                    <hr className="my-4 border-t" />
                </div>
            ))}
            {formData.length === 0 && <p className="text-gray-600">저장된 데이터가 없습니다.</p>}
            <Link
                to="/inquiry"
                className="block text-center border border-white mt-4 p-2 bg-black text-white rounded-md"
            >
                1:1 문의 남기기
            </Link>
        </div>
    );
}
