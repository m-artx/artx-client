import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTimes, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function ProductRegistrationPage() {
    const [request, setRequest] = useState({
        productCategory: 'PAINT',
        productTitle: '',
        productDescription: '',
        productQuantity: 0,
        productPrice: 0,
    });
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequest((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const addProduct = (e) => {
        e.preventDefault();

        const requestJson = {
            productCategory: request.productCategory,
            productTitle: request.productTitle,
            productDescription: request.productDescription,
            productStockQuantity: request.productQuantity,
            productPrice: request.productPrice,
        };

        const payload = {
            files: files.map((file) => file.name), // Assuming you want to send file names
            request: requestJson,
        };

        const accessToken = localStorage.getItem('accessToken');
        axios
            .post('https://ka8d596e67406a.user-app.krampoline.com/api/artist/products', payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                setUploadedFiles(response.data.files);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(files.length / 3));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + Math.ceil(files.length / 3)) % Math.ceil(files.length / 3));
    };

    const handleRemoveFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index + currentSlide * 3, 1);
        setFiles(newFiles);
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full text-white">
                <h2 className="text-3xl font-semibold mb-4 text-center">작품 등록 페이지</h2>
                <form onSubmit={addProduct}>
                    <div>
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-2 block">이미지 추가:</label>
                            <div className="flex space-x-2">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={prevSlide}
                                        className="flex-shrink-0 px-2 py-1 bg-black text-white rounded-l"
                                    >
                                        <FontAwesomeIcon icon={faAngleLeft} />
                                    </button>
                                    <label
                                        htmlFor="file"
                                        className="cursor-pointer p-2 border rounded-md bg-white text-black"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFile}
                                            className="mr-4 pr-1 bg-white text-black"
                                            size="2x"
                                        />
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
                                    files.slice(currentSlide * 3, currentSlide * 3 + 3).map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`File Preview ${index}`}
                                                className="flex-shrink-0 w-1/1 h-32 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(index)}
                                                className="absolute top-0 right-0 p-2 text-white rounded-full "
                                            >
                                                <FontAwesomeIcon icon={faTimes} className="bg-transparent text-white" />
                                            </button>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    className="flex-shrink-0 px-2 py-1 bg-black text-white rounded-r"
                                >
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </div>
                        </div>
                        {files.length > 0 && <div className="flex mt-2"></div>}
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
                            name="productQuantity"
                            onChange={handleInputChange}
                            value={request.productQuantity}
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

                    {uploadedFiles.length > 0 && (
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-2 block">업로드된 파일 목록:</label>
                            <ul>
                                {uploadedFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
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
