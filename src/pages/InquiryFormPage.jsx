// src/InquiryForm.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const InquiryForm = () => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        // 폼 데이터를 로컬 스토리지에 저장
        const formData = {
            title: text,
            message: message,
            file: file ? file.name : null,
        };

        // 로컬 스토리지에 저장된 데이터를 가져와서 배열에 추가
        const storedData = JSON.parse(localStorage.getItem('inquiryFormData')) || [];
        storedData.push(formData);

        // 로컬 스토리지에 새로운 데이터를 저장
        localStorage.setItem('inquiryFormData', JSON.stringify(storedData));

        // 콘솔에도 출력
        console.log('제목:', text);
        console.log('메시지:', message);
        console.log('파일:', file);

        // 파일 업로드 로직을 추가하세요.
        navigate('/inquirymanagement');
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md bg-white text-black">
            <h2 className="text-2xl font-semibold mb-4 bg-white text-black">1:1 문의하기</h2>
            <form className="bg-white text-black" onSubmit={handleSubmit}>
                <div className="mb-4 bg-white text-black">
                    <label htmlFor="text" className="block text-sm font-medium text-gray-600 bg-white text-black">
                        제목
                    </label>
                    <input
                        type="text"
                        id="text"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md bg-white text-black"
                        required
                    />
                </div>

                <div className="mb-4 bg-white text-black">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-600 bg-white text-black">
                        메시지
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="4"
                        className="mt-1 p-2 w-full border rounded-md bg-white text-black"
                        required
                    ></textarea>
                </div>
                <div className="mb-4 bg-white text-black">
                    <label htmlFor="file" className="block text-sm font-medium text-gray-600 bg-white text-black">
                        사진 업로드
                    </label>
                    <div className="flex items-center bg-white text-black">
                        <label
                            htmlFor="file"
                            className="cursor-pointer p-2 border rounded-md bg-gray-100 bg-white text-black"
                        >
                            <FontAwesomeIcon icon={faFile} className="mr-2 bg-white text-black" size="4x" />
                            파일 선택
                        </label>
                        <input type="file" id="file" name="file" onChange={handleFileChange} className="hidden" />
                    </div>
                </div>

                <button type="submit" className="bg-gray-600 text-white p-2 rounded-md ">
                    전송
                </button>
            </form>
        </div>
    );
};

export default InquiryForm;
