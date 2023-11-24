// ProductRegistrationPage.jsx
import React, { useState } from 'react';
import instance from '../store/customAxios'; // 수정된 import 경로
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const ProductRegistrationPage = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        permissionImages: '',
        role: 'ARTIST',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = {
            title: formData.title,
            content: formData.content,
            permissionImages: files,
            role: formData.role,
        };

        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await instance.post(`/api/permission-request`, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    const handleFileChange = async (e) => {
        const selectedFiles = e.target.files;

        // 여기서 파일 선택 이벤트가 발생할 때 바로 서버에 요청을 보내도록 처리
        await uploadImages(selectedFiles);
    };

    const uploadImages = async (selectedFiles) => {
        for (let i = 0; i < selectedFiles.length; i++) {
            const formData = new FormData();
            formData.append('file', selectedFiles[i]);
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await instance.post(`/api/permission-request/image`, formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const imageUrl = response.data;
                console.log(imageUrl, '?');
                setFiles((prevFiles) => [...prevFiles, imageUrl]);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center text-white">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold mb-4 text-center">작가 등록</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"></div>
                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">제목</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">내용</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="file" className="cursor-pointer p-2 border rounded-md bg-white text-black">
                            <FontAwesomeIcon icon={faFile} className="mr-2 bg-white text-black" size="2x" />
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                        />
                    </div>
                    {files.length > 0 &&
                        files.map((file, index) => (
                            <img
                                key={index}
                                src={file}
                                alt={`File Preview ${index}`}
                                className="flex-shrink-0 w-1/3 h-32 object-cover rounded"
                            />
                        ))}
                    <button
                        type="submit"
                        className="border border-white w-full py-2 bg-black text-white font-medium rounded transition duration-300 hover:bg-white hover:text-black"
                    >
                        작품 등록
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductRegistrationPage;
