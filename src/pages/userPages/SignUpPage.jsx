import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../components/shared/InputBox';
import Button1 from '../../components/shared/Button1';

export default function SignUpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //기본 stats 초기값
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

    //에러 state 초기값
    const [formErrors, setFormErrors] = useState({
        userId: '* 4자 이상, 특수 문자 제외한 알파벳 소문자',
        password: '* 영문, 숫자, 특수문자를 포함하여 8~30자로 입력하세요.',
        confirmPassword: '* 동일한 비밀번호를 입력해주세요.',
        email: '* 알맞은 이메일 형식을 작성하여주세요.',
    });

    //유효성 검사
    const [validationStates, setValidationStates] = useState({
        userIdValid: null,
        passwordValid: null,
        confirmPasswordValid: null,
        emailValid: null,
    });

    // 유효성 검사 및 인풋하단 스테이트 업데이트
    const handleValidationAndChange = (name, value) => {
        let errorMsg = '';
        let isValid = false;

        // 아이디 유효성 검사
        if (name === 'userId') {
            isValid = value.length >= 4 && /^[a-z]+$/.test(value);
            errorMsg = isValid ? '' : '* 4자 이상, 특수 문자 제외한 알파벳 소문자';
        }

        // 비밀번호 유효성 검사
        if (name === 'password') {
            isValid = value && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/.test(value);
            errorMsg = isValid ? '' : '* 영문, 숫자, 특수문자를 포함하여 8~30자로 입력하세요.';
        }

        // 비밀번호 확인 검사
        if (name === 'confirmPassword') {
            isValid = value && value === formData.password;
            errorMsg = isValid ? '' : '* 동일한 비밀번호를 입력해주세요.';
        }

        // 이메일 유효성 검사
        if (name === 'email') {
            isValid = value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
            errorMsg = isValid ? '' : '* 알맞은 이메일 형식을 작성하여주세요.';
        }

        updateIsFormValidState(); // 유효성 상태 업데이트

        setFormData({ ...formData, [name]: value }); // 사용자의 입력에 따른 스테이트 업데이트
        setFormErrors({ ...formErrors, [name]: errorMsg }); // 오류체크 및 에러메시지 업데이트
        setValidationStates({ ...validationStates, [`${name}Valid`]: isValid });
    };

    //아이디, 이메일 중복검사용 state
    const [isDuplicateChecking, setIsDuplicateChecking] = useState({
        userId: '',
        email: '',
    });

    // 회원가입 체크용 스테이트
    const [isFormValidState, setIsFormValidState] = useState(false);
    const updateIsFormValidState = () => {
        setIsFormValidState(isFormValid());
    };

    // 중복 확인 함수
    const handleDuplicateCheck = async (target) => {
        //false : 중복이 아니다
        const isDuplicate = ''; // 서버에 중복 확인 요청 (임시 로직)

        // isDuplicate의 상태에 따라 inputBox의 isDuplicateChecking에 넣어준다

        //중복이 아니라면 isDuplicateChecking의 각 값을 true로 만들어라
        if (!isDuplicate) {
            setIsDuplicateChecking((prev) => ({
                ...prev,
                [target]: '완료',
            }));
        } else {
            setIsDuplicateChecking((prev) => ({
                ...prev,
                [target]: '중복확인',
            }));
        }
    };

    const inputFields = [
        {
            label: '아이디',
            name: 'userId',
            type: 'text',
            placeholder: '',
            error: formErrors,
            onDuplicateCheck: handleDuplicateCheck,
            isDuplicateChecking: isDuplicateChecking.userId,
        },
        {
            label: '비밀번호',
            name: 'password',
            type: 'password',
            error: formErrors,
        },
        {
            label: '비밀번호 확인',
            name: 'confirmPassword',
            type: 'password',
            error: formErrors,
        },
        {
            label: '이메일',
            name: 'email',
            type: 'email',
            error: formErrors,
            onDuplicateCheck: handleDuplicateCheck,
            isDuplicateChecking: isDuplicateChecking.email,
        },
        {
            label: '이름',
            name: 'name',
            type: 'text',
            error: formErrors,
        },
        {
            label: '닉네임',
            name: 'nickName',
            type: 'text',
            error: formErrors,
        },
        {
            label: '휴대폰 번호',
            name: 'phoneNumber',
            type: 'text',
            error: formErrors,
        },
        {
            label: '주소',
            name: 'address',
            type: 'text',
            error: formErrors,
        },
    ];

    // 하단 버튼 관련 함수

    // 모든 입력이 완료되고 유효성 검사 및 중복 확인이 모두 통과되었는지 확인
    const isFormValid = () => {
        console.log('isFormValid');
        return (
            Object.values(validationStates).every((isValid) => isValid === true) &&
            Object.values(isDuplicateChecking).every((status) => status === '완료')
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isFormValid()) {
            alert('모든 입력이 완료되고 유효성 검사를 통과해야 합니다.');
            return;
        }
        const userInfo = { ...formData };
      //   dispatch(loginUser(userInfo));
      navigate('/login');

    };

    const handleCancelClick = () => {
        if (window.confirm('가입을 취소하시겠습니까? 확인을 누르면 메인화면으로 돌아갑니다.')) {
            navigate('/');
        }
    };

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
                        onChange={(e) => handleValidationAndChange(field.name, e.target.value)}
                        error={formErrors[field.name]}
                        placeholder={field.placeholder}
                        validate={field.validate}
                        onDuplicateCheck={field.onDuplicateCheck} //중복버튼 켰는지 확인
                        handleDuplicateCheck={() => handleDuplicateCheck(field.name)}
                        isDuplicateChecking={isDuplicateChecking[field.name]}
                    />
                ))}

                <div className="flex items-center justify-center bg-white w-auto mt-20">
                    <Button1
                        onClick={handleCancelClick}
                        label="취소하기"
                        type="submit"
                        disabled={false}
                        className="w-[140px]"
                        // 기본 스타일 p-2 bg-black text-white mt-4
                    />
                    <Button1
                        onClick={handleSubmit}
                        label="가입하기"
                        type="submit"
                        disabled={!isFormValidState} // 유효성 검사 상태에 따라 버튼 활성화 상태 결정
                        className={`w-[140px] ${isFormValidState ? 'border-2 border-blue-500' : ''}`} // 조건부 클래스 추가
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
