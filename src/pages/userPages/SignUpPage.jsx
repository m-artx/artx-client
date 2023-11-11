import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../components/shared/InputBox';
import Button1 from '../../components/shared/Button1';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        name: '',
        nickName: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [idState, setIdState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    // 아이디 유효성 검사 함수
    //아이디가 4자 이상이어야 하고 영어 소문자만을 사용하며 특수 문자를 포함하지 않아야 할 경우:
    const isUserIdValid = (userId) => {
      return userId.length >= 4 && /^[a-z]+$/.test(userId);
   };

    // 이메일 유효성 검사 함수
    // 형식에 맞으면 test함수가 true를 반환한다
    const isEmailValid = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    // 전체 데이터가 채워져 있어야 회원가입을 할 수 있게 한다
    // 아이디, 비밀번호, 이메일 유효성 체크
    const isFormValid = () => {
        return (
            isUserIdValid(formData.userId) && //아이디 유효성 트루
            isEmailValid(formData.email) && // 이메일이 유효성 트루
            formData.password.trim() !== '' && //패스워드 내용있음
            passwordError === '' && //패스워드 에러없음
            formData.name.trim() !== '' && //이름부분 내용있음
            formData.password === formData.confirmPassword //패스워드 컨펌
        );
    };




    const validateUserId = () => isUserIdValid(formData.userId);
    const validateEmail = () => isEmailValid(formData.email);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // 비밀번호 유효성 검사 정규표현식
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/;

        // 비밀번호 검사
        if (name === 'password') {
            if (!passwordRegex.test(value)) {
                setPasswordError('영문, 숫자, 특수문자를 포함하여 8~30자로 입력하세요.');
            } else {
                setPasswordError('');
            }
        }

        // 비밀번호 확인 검사
        if (name === 'confirmPassword' && formData.password !== value) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 유효성 검사 추가
        if (!isFormValid()) {
            console.error('입력이 유효하지 않습니다.');
            return;
        }

        // 여기에서 회원가입 로직을 처리한 후 유저 정보를 dispatch 합니다.
        // 예: 서버에 회원가입 요청을 보내고 응답을 받은 후 dispatch(loginUser(userInfo))를 호출
        const userInfo = { ...formData }; // 예시로 사용자 정보 생성
        dispatch(loginUser(userInfo));
        console.log('회원가입 정보:', formData);
    };

    const handleCancelClick = () => {
        const isConfirmed = window.confirm('가입을 취소하시겠습니까? 확인을 누르면 메인화면으로 돌아갑니다.');
        if (isConfirmed) {
            navigate('/');
        }
    };

    const inputFields = [
       {
            label: '아이디',
            name: 'userId',
            type: 'text',
            // error: !isUserIdValid(formData.userId) && '아이디가 유효하지 않습니다.',
            error: formData.userId && !isUserIdValid(formData.userId) && '아이디가 유효하지 않습니다.',

            validate: true,
            onValidate: validateUserId,
            placeholder: "'4자이상, 특수문자 제외한 알파벳 소문자'"
            
        },
        {
            label: '비밀번호',
            name: 'password',
            type: 'password',
            error: passwordError,
        },
        // ...[다른 필드]...
        {
            label: '이메일',
            name: 'email',
            type: 'email',
            error: !isEmailValid(formData.email) && '이메일이 유효하지 않습니다.',
            validate: true,
            onValidate: validateEmail,
        },
        // ...[기타 필드]...

        //   name: '',
        //   nickName: '',
        //   email: '',
        //   phoneNumber: '',
        //   address: '',
    ];

    return (
        <div className="bg-white text-black justify-center items-center w-[1000px] ">
            <form
                className="flex items-center flex-col h-auto p-4 bg-white shadow-md text-black border-8 border-green-600"
                onSubmit={handleSubmit}
            >
                 {inputFields.map((field) => (
                    <InputBox
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleChange}
                        error={field.error}
                        validate={field.validate}
                        onValidate={field.onValidate}
                        placeholder={field.placeholder}
                    />
                ))}

                <div className="flex items-center justify-center bg-white w-auto">
                    <Button1
                        onClick={handleCancelClick}
                        label="취소하기"
                        type="submit"
                        disabled={false}
                        className="w-[140px]"
                        // 기본 스타일 p-2 bg-black text-white mt-4
                    />
                    <Button1
                        label="가입하기"
                        type="submit"
                        disabled={false}
                        className="w-[140px]"
                        // 기본 스타일 p-2 bg-black text-white
                    />
                </div>
                {/* <button type="submit" className="w-full p-2 bg-black text-white mt-4">
                    가입하기
                </button>
                <button className="w-full p-2 mt-4 mb-6 bg-black text-white shadow-md" onClick={handleCancelClick}>
                    취소하기
                </button> */}
            </form>
        </div>
    );
}
