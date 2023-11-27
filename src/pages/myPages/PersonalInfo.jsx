import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; //디스패치로 저장하고 셀렉터로 가져온다
import axiosInstance from '../../instance/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import customAxios from '../../store/customAxios';
import MyPageDataFetcher from '../../components/shared/MyPageDataFetcher';

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
    return (
        <button className=" bg-white w-13 px-4 mx-4 border italic rounded-sm hover:bg-gray-800 ">
            {text}
        </button>
    );
};

const Div = ({ children }) => {
    return <div className=" pl-10 flex justyfy-start h-6 m-4 bg-white">{children}</div>;
};

//내정보변경일단보류
// const handleButtonClick = async(newText) => {
//     try {
//         const response = await axiosInstance.post('/update-endpoint', { newText });
//         console.log('Server updated with new text:', response.data);
//     } catch (error) {
//         console.error('Error updating server:', error);
//     }
// }

// 펑션시작
// 이미지만따로받아오면되는데 팻치데이터로 전체데이터가 유즈이펙트로다받아와져서 좀 비효율적임

function PersonalInfo() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [userData, setUserData] = useState({});
    //유저데이터가 바뀌면 유즈이펙트 다시실행. 이미지를 다시가져오기위함
    const [fetchTrigger, setFetchTrigger] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await MyPageDataFetcher();
                if (data) {
                    setUserData(data);
                } else {
                    console.log('유저데이터 팻치이상, no error');
                }
            } catch (error) {
                // Handle error
                console.error('유저데이터 팻치이상', error);
            }
        };

        fetchData();
    }, [fetchTrigger]);

    //리액트 useState 내에서 연산자를 직접사용할수 없다. 외부에서 계산한 뒤 이를 인수로 전달해야한다.

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // 이미지 저장
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            console.log('클릭함수, 변경전이미지', userData.userProfileImage);
            try {
                const res = await axiosInstance.post(`/api/mypage/image`, formData);
                if (res) {
                    console.log('이미지 서버저장성공', res);
                    setFetchTrigger((prev) => !prev);
                    setUserData(res); //값을 바로받는모양이다 그래서 res.data를 하면 오류가남
                } else {
                    console.log('핸들파일함수 서버이상, no error');
                    // if (res.status === 200) {
                    //     console.log('Image upload successful');
                    // } else {
                    //     console.error('Unexpected response structure:', res);
                    // }
                }
            } catch (error) {
                console.error('핸들파일함수 서버이상', error);
            }
        }
    };

    //이미지가 없으면 기본 프로필사진을 넣어주는 코드
    const defaultImage =
        'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800';
    const imageUrl = `${userData.userProfileImage}` || defaultImage;

    //화면 글자변경 함수
    const handleTextChange = (e, field) => {
        setUserData({ ...userData, [field]: e.target.value });
    };

    return (
        <div className="bg-white text-black w-[1000px] flex justify-center  pb-20">
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
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    size="xs"
                                    className=" bg-blue-400 text-white"
                                />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    
                        <Link to="/artistRegistration">
                            <div className=" bg-gray-200 text-center p-2 px-4">
                                작가등록
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="bg-white ml-6">
                    <Div>
                        <Label text="아이디" />
                        {/* <Input type="text" disable value={userData.username || ''} /> */}
                        <div
                            type="text"
                            className=" bg-white w-[150px] focus:outline-none px-4 border-b"
                        >
                            {userData.username || ''}
                        </div>
                    </Div>
                    <Div>
                        <Label text="이메일" />
                        <Input
                            type="text"
                            value={userData.userEmail || ''}
                            onChange={handleTextChange}
                        />
                        <Button text="변경" />
                    </Div>
                    <Div>
                        <Label text="닉네임" />
                        <Input
                            type="text"
                            value={userData.userNickname || ''}
                            onChange={handleTextChange}
                        />
                        <Button text="변경" />
                    </Div>
                    <Div>
                        <Label text="전화번호" />
                        <Input
                            type="text"
                            value={userData.userPhoneNumber || ''}
                            onChange={handleTextChange}
                        />
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
