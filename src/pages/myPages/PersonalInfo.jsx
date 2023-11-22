import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; //디스패치로 저장하고 셀렉터로 가져온다
import axiosInstance from '../../instance/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import customAxios from '../../store/customAxios';
import axios from 'axios';
import MyPageDataFetcher from '../../components/shared/MyPageDataFetcher';

// 개인정보관리
// 이미지를 저장하면 서버로 전송된다
// 이미지를 보여줄때 서버에서 가져온다

const Label = ({ text, value }) => {
    return (
        <label className="bg-white w-20 px-2 border-b" value={value}>
            {text}
        </label>
    );
};
const Input = ({ type, value, onChange, disable }) => {
    return (
        <input
            className=" bg-white w-[150px] focus:outline-none px-4 border-b"
            type={type}
            value={value}
            onChange={onChange}
            disable={disable}
        ></input>
    );
};
const Button = ({ text }) => {
    return <button className=" bg-white w-13 px-4 mx-4 border italic rounded-sm hover:bg-gray-800 ">{text}</button>;
};

const Div = ({ children }) => {
    return <div className=" pl-10 flex justyfy-start h-6 m-4 bg-white">{children}</div>;
};

function PersonalInfo() {
    const localUsername = localStorage.getItem('username');
    // const userInfo = useSelector((state) => state.user);
    const navigate = useNavigate();
    // const profileImage = instance.post(`/api/users/{${userInfo.userId}}/image`)
    const fileInputRef = useRef(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await MyPageDataFetcher();
                if (data) {
                    setUserData(data);
                }
            } catch (error) {
                // Handle error
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    console.log('userData', userData);

    const [imageUrl, setImageUrl] = useState(
        'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800'
    );

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // 이미지 저장 1. customAxios 사용, 토큰을 같이보내보기. 성공!
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const formData = new FormData();

            formData.append('file', selectedFile);
            const token = localStorage.getItem('accessToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            try {
                const res = await customAxios.post(`/api/mypage/image`, formData, config);
                if (res.status === 200) {
                    console.log('이미지서버저장성공', res.data);
                    setImageUrl(userData.userProfileImage);
                    console.log('바로안되나?',userData.userProfileImage)

                } else {
                    console.error('반응은있는데 이미지저장실패:', res.status);
                }

            } catch (error) {
                console.error('이미지서버저장실패', error);
            }
        }
    };

    //화면 글자변경 함수
    const handleTextChange = (e, field) => {
        setUserData({ ...userData, [field]: e.target.value });
    };

    //업데이트된 유저데이터를 서버로 저장하는 버튼에 연결할 함수
    // const handleSaveChanges = async () => {
    //     try {
    //         const res = await customAxios.put('/api/mypage', userData); // Adjust the API endpoint and method according to your backend
    //         console.log('Save response:', res.data);
    //         // Optionally, show a success message or update state
    //     } catch (error) {
    //         console.error('Error saving changes', error);
    //         // Optionally, show an error message
    //     }
    // };

    return (
        <div className="bg-white text-black w-[1000px] flex justify-center pb-20">
            <div className="w-[440px] bg-white">
                <div className="flex justify-center bg-white">
                    <div className="flex justify-center items-center border w-[200px] flex-col mx-auto my-4 bg-white ">
                        <div className="p-2 relative bg-white">
                            프로필 사진
                            <img
                                className="w-14 h-14 m-2 rounded-full object-cover bg-gray-400"
                                src={imageUrl}
                                alt="Profile"
                                onClick={handleImageClick}
                            />
                            <div
                                className="absolute bottom-4 right-4 h-5 w-5 rounded-full text-center flex items-center justify-center bg-blue-400"
                                onClick={handleImageClick}
                            >
                                <FontAwesomeIcon icon={faEdit} size="xs" className=" bg-blue-400 text-white" />
                            </div>
                        </div>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>
                </div>
                <div className="bg-white ml-6">
                    <Div>
                        <Label text="아이디" />
                        {/* <Input type="text" disable value={userData.username || ''} /> */}
                        <div type="text" className=" bg-white w-[150px] focus:outline-none px-4 border-b">
                            {userData.username || ''}
                        </div>
                    </Div>
                    <Div>
                        <Label text="이메일" />
                        <Input type="text" value={userData.userEmail || ''} onChange={handleTextChange} />
                        <Button text="변경" />
                    </Div>
                    <Div>
                        <Label text="닉네임" />
                        <Input type="text" value={userData.userNickname || ''} onChange={handleTextChange} />
                        <Button text="변경" />
                    </Div>
                    <Div>
                        <Label text="전화번호" />
                        <Input type="text" value={userData.userPhoneNumber || ''} onChange={handleTextChange} />
                        <Button text="변경" />
                    </Div>
                </div>

                <div className="bg-white ml-6">
                    <Div>
                        <Label text="한줄소개" />
                    </Div>
                    <Div>
                        <textarea
                            type="text"
                            className="w-[230px] focus:outline-none px-2 border-b resize-none bg-white"
                            value={userData.userIntroduction || ''} //내용없으면 빈문자열처리
                            onChange={(e) => handleTextChange(e, 'userIntroduction')}
                        ></textarea>
                        <Button
                            text="변경"
                            // onClick={handleSaveChanges}
                        />
                    </Div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfo;
