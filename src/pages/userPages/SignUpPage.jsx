import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../components/shared/InputBox';
import Button1 from '../../components/shared/Button1';
import customAxios from '../../store/customAxios';

//재영님이 메일은 문자열식?으로 반환되야한다고 한것같음

export default function SignUpPage() {
    const navigate = useNavigate();

    //유저정보 stats 초기값
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        isEmailYn: false,
        nickname: '',
        phoneNumber: '',
        address: '',
        addressDetail: '',
        userRole: 'USER',
    });

    //에러 state 초기값
    const [formErrors, setFormErrors] = useState({
        username: '* 4자 이상, 영문 소문자와 숫자만 허용됩니다.',
        password: '* 영문, 숫자, 특수문자를 포함하여 8~30자로 입력하세요.',
        email: '* 알맞은 이메일 형식을 작성하여주세요.',
    });

    // 유효성 검사 및 인풋하단 스테이트 업데이트
    const handleValidationAndChange = (name, value) => {
        let errorMsg = '';
        let isValid = false;

        // 아이디 유효성 검사
        if (name === 'username') {
            isValid = value.length >= 4 && /^[a-z0-9]+$/.test(value);
            errorMsg = isValid ? '' : '* 4자 이상, 영문 소문자와 숫자만 허용됩니다.';
        }

        // 비밀번호 유효성 검사
        if (name === 'password') {
            // isValid = value && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/.test(value);
            isValid = value && /^[a-z]+$/.test(value);
            errorMsg = isValid ? '' : '* 영문, 숫자, 특수문자를 포함하여 8~30자로 입력하세요.';
        }
        
        // 아이디 비밀번호가 변경되면 완료상태를 취소하는 코드
        if ((name === 'username' || name === 'email') && formData[name] !== value && isDuplicateChecking[name] === '완료') {
            setIsDuplicateChecking(prev => ({
                ...prev,
                [name]: '중복확인'
            }));
        }

        // 이메일 유효성 검사
        if (name === 'email') {
            isValid = value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
            errorMsg = isValid ? '' : '* 알맞은 이메일 형식을 작성하여주세요.';
        }

        if (name === 'nickname') isValid = true;
        if (name === 'phoneNumber') isValid = true;
        if (name === 'address') isValid = true;
        if (name === 'addressDetail') isValid = true;

        if (name === 'isEmailYn') {
            // 체크박스의 경우, value 대신 checked 상태를 저장합니다.
            setFormData({ ...formData, [name]: value });
        } else {
            // 기타 필드의 경우, 기존 로직을 그대로 사용합니다.
            setFormData({ ...formData, [name]: value });
            setFormErrors({ ...formErrors, [name]: errorMsg });
            setValidationStates({ ...validationStates, [`${name}Valid`]: isValid });
        }

        setFormData({ ...formData, [name]: value }); // 사용자의 입력에 따른 스테이트 업데이트
        setFormErrors({ ...formErrors, [name]: errorMsg }); // 오류체크 및 에러메시지 업데이트
    };

    //아이디, 이메일 중복검사용 state
    const [isDuplicateChecking, setIsDuplicateChecking] = useState({
        username: '',
        email: '',
    });

    // 중복확인 로직
    const checkUsernameDuplicate = async (fieldName) => {
        const apiEndpoint =
            fieldName === 'username'
                ? '/api/users/validation/username'
                : '/api/users/validation/email';
        console.log('중복체크로직내부');

        if (!fieldName) {
            alert('적절한 내용을 입력 후 다시 시도해보세요.');
            return;
        }
        const valueToCheck = formData[fieldName];

        try {
            const response = await customAxios.post(apiEndpoint, { [fieldName]: valueToCheck });

        if (response.status === 200) {
            // Assuming response contains a boolean indicating duplication
            const isDuplicate = response.data.isDuplicate;
            setIsDuplicateChecking((prev) => ({
                ...prev,
                [fieldName]: isDuplicate ? '중복' : '완료',
            }));
        } 
            //이부분 조절필요
            // if (response.status === 200) {
            //     const isDuplicate = response;
            //     console.log('유저정보, 리스폰스데이터 : ', isDuplicate);
            //     // username유효성처리
            //     if (/^[a-z]+$/.test(valueToCheck)) {
            //             if (fieldName === 'username') {
            //             setIsDuplicateChecking((prev) => ({
            //                 ...prev,
            //                 [fieldName]: '완료',
            //             }));
            //             console.log('유저네임체크');
            //         } else {
            //             alert('중복된 아이디입니다. 다시 입력해주세요.')
            //             setIsDuplicateChecking((prev) => ({
            //                 ...prev,
            //                 [fieldName]: '중복확인',
            //             }));
            //         }
            //     } else if (fieldName === 'email') {
            //         if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valueToCheck)) {
            //             setIsDuplicateChecking((prev) => ({
            //                 ...prev,
            //                 [fieldName]: '완료',
            //             }));
            //             console.log('이메일체크');
            //         } else {
            //             alert('중복된 이메일입니다. 다시 입력해주세요.')
            //             setIsDuplicateChecking((prev) => ({
            //                 ...prev,
            //                 [fieldName]: '중복확인',
            //             }));
            //         }
            //     } else {
            //         console.log('그 어떤 폼데이터 형식도 아니락호?');
            //     }
            //     console.log(isDuplicateChecking);
            // } else if (response.status === 400) {
            //     if (valueToCheck === 'username') {
            //         alert('이미 사용중인 아이디입니다. 다른 아이디를 입력하세요.');
            //     }
            //     if (valueToCheck === 'email') {
            //         alert('이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.');
            //     }
            // } else {
            //     console.log('중복체크오류 no error');
            // }


        } catch (error) {
            console.log('중복체크오류', error);
        }
    };

    //회원가입 버튼 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = isFormValid();
        setIsFormValidState(isValid);
        if (!isValid) {
            alert('모든 입력이 완료되고 중복 검사를 통과해야 합니다.');
            return;
        }
        try {
            const userInfo = { ...formData };
            await registerUser(userInfo);
            setIsSuccessModalOpen(true); // 성공 모달 표시
        } catch (error) {
            alert(error.message); // 실패 시 오류 메시지 표시
        }
    };

    // 유저등록API
    const registerUser = async (userData) => {
        try {
            const response = await customAxios.post('/api/users', userData);
            console.log('회원가입 성공', userData);
            return response.data; // 회원가입 성공시 응답 데이터 반환
        } catch (error) {
            console.error('Signup error', error.response || error);
            throw new Error(
                '회원가입 실패: ' + (error.response ? error.response.data.message : error.message)
            );
        }
    };

    //유효성 검사 (원하는부분은 null처리)
    const [validationStates, setValidationStates] = useState({
        usernameValid: null,
        passwordValid: null,
        emailValid: null,
        nicknameValid: true,
        phoneNumberValid: true,
        addressValid: true,
        addressDetailValid: true,
        isEmailYnValid: true,
    });

    const inputFields = [
        {
            label: '아이디',
            name: 'username',
            type: 'text',
            placeholder: '',
            error: formErrors,
            onDuplicateCheck: checkUsernameDuplicate,
            isDuplicateChecking: isDuplicateChecking.username,
        },
        {
            label: '비밀번호',
            name: 'password',
            type: 'password',
            error: formErrors,
        },
        {
            label: '이메일',
            name: 'email',
            type: 'email',
            error: formErrors,
            onDuplicateCheck: checkUsernameDuplicate,
            isDuplicateChecking: isDuplicateChecking.email,
        },
        {
            label: '닉네임',
            name: 'nickname',
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
        {
            label: '세부주소',
            name: 'addressDetail',
            type: 'text',
            error: formErrors,
        },
    ];

    // 회원가입 체크용 스테이트
    const [isFormValidState, setIsFormValidState] = useState(false);

    // 모든 입력이 완료되고 유효성 검사 및 중복 확인이 모두 통과되었는지 확인
    const isFormValid = () => {
        console.log('isFormValid');
        // isEmailYn 필드는 유효성 검사에서 제외
        const { isEmailYnValid, ...otherValidationStates } = validationStates;
        return (
            Object.values(validationStates).every((isValid) => isValid === true) &&
            Object.values(isDuplicateChecking).every((status) => status === '완료')
        );
    };

    // 회원가입 성공 모달 상태 변수 추가
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    // 모달을 닫는 함수
    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
        // 모달을 닫을 때 추가 작업을 할 수 있습니다.
        // 예: 다른 페이지로 이동
        navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
    };

    //가입취소버튼
    const handleCancelClick = () => {
        if (window.confirm('가입을 취소하시겠습니까? 확인을 누르면 메인화면으로 돌아갑니다.')) {
            navigate('/');
        }
    };

    return (
        <div className="bg-white text-black justify-center items-center w-[1000px] ">
            <form
                className="flex items-center flex-col h-auto p-4 bg-white shadow-md text-black "
                onSubmit={handleSubmit}
            >
                {inputFields.map((field) => (
                    // <div key={field.name} className="bg-white">
                    //     <InputBox
                    //         label={field.label}
                    //         name={field.name}
                    //         type={field.type}
                    //         value={formData[field.name]}
                    //         onChange={(e) => handleValidationAndChange(field.name, e.target.value)}
                    //         error={formErrors[field.name]}
                    //         placeholder={field.placeholder}
                    //         validate={field.validate}
                    //     />

                    //     {/* Conditionally render the duplicate check button for username */}
                    //     {field.name === 'username' && validationStates.usernameValid && (
                    //         <button onClick={() => checkUsernameDuplicate('username')} className="ml-2">
                    //             중복 확인
                    //         </button>
                    //     )}
                    // </div>

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
                        handleDuplicateCheck={() => checkUsernameDuplicate(field.name)}
                        isDuplicateChecking={isDuplicateChecking[field.name]}
                    />
                ))}

                <div className="bg-white pt-10 flex justify-start w-[300px]">
                    <input
                        type="checkbox"
                        name="isEmailYn"
                        checked={formData.isEmailYn}
                        onChange={(e) => handleValidationAndChange('isEmailYn', e.target.checked)}
                    />
                    <p className="bg-white px-2 text-xs">이메일 수신을 원하시면 체크해주세요.</p>
                </div>
                <div className="flex items-center justify-center bg-white w-auto mt-3">
                    <Button1
                        onClick={handleCancelClick}
                        label="취소하기"
                        // type="submit"
                        disabled={false}
                        className="w-[140px]"
                    />
                    <Button1
                        // onClick={handleSubmit}
                        label="가입하기"
                        type="submit"
                        className={`w-[140px]`}
                    />
                </div>
            </form>
            {isSuccessModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white text-black border-4 p-4 rounded flex  flex-col justify-center items-center w-[200px]">
                        <h2 className="bg-white p-4">회원가입 성공</h2>
                        <button
                            onClick={handleCloseSuccessModal}
                            className="bg-black text-white w-20 "
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
