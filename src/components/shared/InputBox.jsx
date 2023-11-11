import React, { useState, useEffect } from 'react';
import { MdCheckCircle, MdCancel } from 'react-icons/md'; // 필요한 아이콘을 import합니다.

//  각종 정보 입력 Input으로 다음과 같은 props를 포함한다
// label: 인풋 필드의 레이블 텍스트.
// name: 인풋 필드의 이름.
// type: 인풋 필드의 타입 (예: 'text', 'password', 'email' 등).
// value: 인풋 필드의 현재 값.
// onChange: 인풋 필드의 값이 변경될 때 호출되는 함수.
// error: 인풋 필드에 대한 에러 메시지 (유효성 검사 에러 등).
// validate: 유효성검사를 사용할것인가 true/false
// onValidate:

function InputBox({ label, name, type, value, onChange, error, validate, onValidate, placeholder }) {
    const [icon, setIcon] = useState(null); // icon state
    const [isTouched, setIsTouched] = useState(false); // track if input has been touched
    const [isValid, setIsValid] = useState(null); // track validity status

    // 유효성 검사 아이콘 업데이트
    const updateValidationIcon = () => {
        if (isValid) {
            setIcon(<MdCheckCircle className="text-green-500" />);
        } else if (isValid === false) {
            setIcon(<MdCancel className="text-red-500" />);
        } else {
            setIcon(null);
        }
    };

    // validate 클릭 시
    const handleValidation = () => {
        const validationResult = onValidate ? onValidate() : true;
        setIsValid(validationResult);
        updateValidationIcon();
    };

    // onBlur 이벤트를 통해 입력 필드가 터치된 것을 감지
    const handleBlur = () => {
        setIsTouched(true);
        handleValidation();
    };

    return (
        <div className="mb-4 bg-white w-[300px]">
            <label htmlFor={name} className="text-xs bg-white text-black">
                {label}
            </label>
            <div className="flex items-center">
                <input
                    className={`w-full p-2 border-none shadow-md bg-white rounded-sm placeholder:text-sm ${placeholder}`}
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required
                    placeholder={placeholder}
                />
                {isTouched && validate && icon}
                
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export default InputBox;
