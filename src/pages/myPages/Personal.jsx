import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; //디스패치로 저장하고 셀렉터로 가져온다
import instance from '../../instance/instance';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import customAxios from '../../store/customAxios';

// 이미지를 저장하면 서버로 전송된다
// 이미지를 보여줄때 서버에서 가져온다

const Label = ({ text }) => {
    return <label className="w-20 px-2 border-b">{text}</label>;
};
const Input = ({ type }) => {
    return <input className=" w-[150px] focus:outline-none px-4 border-b" type={type}></input>;
};
const Button = ({ text }) => {
    return <button className=" w-13 px-4 mx-4 border italic rounded-sm hover:bg-gray-800">{text}</button>;
};

const Div = ({ children }) => {
    return <div className=" pl-10 flex justyfy-start h-6 m-4">{children}</div>;
};

function Personal() {
    const localUsername = localStorage.getItem('username');
    const userInfo = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태
    const navigate = useNavigate();
    //const profile = data

    //유저정보 오류
    useEffect(() => {
        instance
            .get(`/api/users/${localUsername}`)
            .then((response) => {
                setUserData(response.data); //api로부터 사용자 정보를 받아온다
                console.log(userData);
            })
            .catch((error) => {
                console.error('유저인포에러', error);
                if (error.response && (error.response.state === 401 || error.response.state === 403)) {
                    navigate('/login');
                }
            });
    }, [navigate]);

    const fileInputRef = useRef(null);
    // const imageData = customAxios.post(`/api/users/${localUsername}/image`)
    const [imageUrl, setImageUrl] = useState('');

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const formData = new FormData(); //폼데이터생성
            formData.append('image', selectedFile);

            try {
                const res = await customAxios.post(`/api/users/${localUsername}/image`);
                const imgUrl = res.data.imageUrl;
                setImageUrl(imgUrl);
            } catch (error) {
                console.error('이미지저장실패', error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="flex justify-center items-center border w-[200px] flex-col mx-auto my-4">
                    <div className="p-2 relative">
                        프로필 사진
                        <img
                            className="w-14 h-14 m-2 rounded-full object-cover "
                            src={imageUrl} // Use the imageUrl state here
                            alt="Profile"
                            onClick={handleImageClick}
                        />
                        <div
                            className="absolute bottom-4 right-4 h-5 w-5 rounded-full text-center flex items-center justify-center bg-blue-400"
                            onClick={handleImageClick}
                        >
                            <FontAwesomeIcon icon={faEdit} size="sm" className=" bg-blue-400" />
                        </div>
                    </div>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                </div>
            </div>
            <div>
                <Div>
                    <Label text="아이디" />
                    <Input type="text" />
                </Div>
                <Div>
                    <Label text="이름" />
                    <Input type="text" />
                    <Button text="변경" />
                </Div>
                <Div>
                    <Label text="이메일" />
                    <Input type="text" />
                    <Button text="변경" />
                </Div>
                <Div>
                    <Label text="닉네임" />
                    <Input type="text" />
                    <Button text="변경" />
                </Div>
                <Div>
                    <Label text="전화번호" />
                    <Input type="text" />
                    <Button text="변경" />
                </Div>
            </div>

            <div>
                <Div>
                    <Label text="한줄소개" />
                </Div>
                <Div>
                    <textarea
                        type="text"
                        className="w-[230px] focus:outline-none px-2 border-b resize-none "
                    ></textarea>
                    <Button text="변경" />
                </Div>
            </div>
        </div>
    );
}

export default Personal;
