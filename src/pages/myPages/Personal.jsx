import React, { useRef, useState } from 'react';

// 아이디
// 이름
// 이메일
// 닉네임
// 전화번호
// 프로필사진변경
// 한줄소개

// 탈퇴하기 버튼

const Label = ({ text }) => {
    return <label className="w-20 px-2 border-b">{text}</label>;
};
const Input = ({ type }) => {
    return <input className=" w-[150px]  focus:outline-none px-4 border-b" type={type}></input>;
};
const Button = ({ text }) => {
    return <button className=" w-13 px-4 mx-4 border italic rounded-sm hover:bg-gray-800">{text}</button>;
};

const Div = ({ children }) => {
    return <div className=" pl-10 flex justyfy-start h-6 m-4">{children}</div>;
};

function Personal() {
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(
        'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800'
    );

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImageUrl(imageUrl);
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="flex justify-center items-center border w-[200px] flex-col mx-auto my-4">
                    <div className="p-2">프로필 사진</div>
                    <img
                        className="w-14 h-14 m-2 rounded-full object-cover"
                        src={imageUrl} // Use the imageUrl state here
                        alt="Profile"
                        onClick={handleImageClick}
                    />
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
