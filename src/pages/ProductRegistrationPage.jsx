import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function ProductRegistrationPage() {
    const [request, setRequest] = useState({
        productCategory: '1',
        productTitle: '',
        productDescription: '',
        productStockQuantity: '',
        productPrice: '',
        productImages: [], // 변경된 부분
    });
    const [files, setFiles] = useState([]);
    const [uploadedProduct, setUploadedProduct] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequest((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                const response = await axios.post(
                    `https://ka8d596e67406a.user-app.krampoline.com/api/permission-request/image`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                const imageUrl = response.data;

                console.log(imageUrl, '?');
                setFiles([...files, imageUrl]);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();

        request.productImages = files;

        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.post(
                'https://ka8d596e67406a.user-app.krampoline.com/api/artist/products',
                request,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);
            // setUploadedFiles(response.data.files);
        } catch (error) {
            console.log(error);
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(files.length / 3));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + Math.ceil(files.length / 3)) % Math.ceil(files.length / 3));
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full text-white">
                <h2 className="text-3xl font-semibold mb-4 text-center">작품 등록 페이지</h2>
                <form onSubmit={addProduct}>
                    <div>
                        <div className="mb-4">
                            <div className="flex space-x-2">
                                <div className="flex items-center">
                                    <label
                                        htmlFor="file"
                                        className="cursor-pointer p-2 border rounded-md bg-white text-black"
                                    >
                                        <FontAwesomeIcon icon={faFile} className="mr-2 bg-white text-black" size="2x" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="files"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        multiple
                                    />
                                </div>
                                {files.length > 0 &&
                                    files
                                        .slice(currentSlide * 3, currentSlide * 3 + 3)
                                        .map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`File Preview ${index}`}
                                                className="flex-shrink-0 w-1/3 h-32 object-cover rounded"
                                            />
                                        ))}
                            </div>
                        </div>
                        {files.length > 0 && (
                            <div className="flex mt-2">
                                <button
                                    type="button" // 버튼의 타입을 button으로 변경
                                    onClick={prevSlide}
                                    className="flex-shrink-0 px-2 py-1 bg-black text-white rounded-l"
                                >
                                    이전
                                </button>
                                <button
                                    type="button" // 버튼의 타입을 button으로 변경
                                    onClick={nextSlide}
                                    className="flex-shrink-0 px-2 py-1 bg-black text-white rounded-r"
                                >
                                    다음
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">작품명:</label>
                        <input
                            value={request.productTitle}
                            onChange={handleInputChange}
                            type="text"
                            name="productTitle"
                            className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">작품 설명:</label>
                        <textarea
                            value={request.productDescription}
                            onChange={handleInputChange}
                            name="productDescription"
                            className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">수량:</label>
                        <input
                            type="number"
                            name="productStockQuantity"
                            onChange={handleInputChange}
                            value={request.productStockQuantity}
                            className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">가격:</label>
                        <input
                            type="number"
                            name="productPrice"
                            onChange={handleInputChange}
                            value={request.productPrice}
                            className="w-full py-2 px-4 bg-white border rounded text-black focus:outline-none focus:border-black"
                        />
                    </div>

                    {uploadedProduct && (
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-2 block">업로드된 작품 정보:</label>
                            <p>{uploadedProduct.message}</p>
                        </div>
                    )}

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
}

export default ProductRegistrationPage;
