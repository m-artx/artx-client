import React, { useState, useEffect } from 'react';
import { MdCheckCircle, MdCancel } from 'react-icons/md'; // 필요한 아이콘을 import합니다.

//  각종 정보 입력 Input으로 다음과 같은 props를 포함한다
// label: 인풋 필드의 레이블 텍스트.
// name: 인풋 필드의 이름.
// type: 인풋 필드의 타입 (예: 'text', 'password', 'email' 등).
// value: 인풋 필드의 현재 값.
// onChange: 인풋 필드의 값이 변경될 때 호출되는 함수.
// error: 인풋 필드에 대한 에러 메시지 (유효성 검사 에러 등).
// placeholder
// onDuplicateCheck 중복 체크 함수 넣기
// isDuplicateChecking 중복 체크 결과값이 '완료'라면 글씨만 파란색으로, '중복확인'이라면 파란색 border로 바꿔준다

function InputBox({ label, name, type, value, onChange, error, placeholder, onDuplicateCheck, isDuplicateChecking }) {
    const errorMessageStyle = error === '완료' ? 'text-blue-500' : 'text-red-400';

    return (
        <div className="mb- bg-white w-[300px]">
            <label htmlFor={name} className="text-xs bg-white text-black">
                {label}
            </label>
            <div className="flex items-center bg-white">
                <input
                    className="w-full p-2 border shadow-md rounded-sm placeholder:text-sm bg-white focus:outline-none"
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    // placeholder={placeholder}
                    autoComplete="new-password" // 경고해제용
                />
                {/* 중복체크박스 부분 */}
                <div className="relative ml-2">
                    {onDuplicateCheck && (
                        <button
                        className={`absolute top-[-10px] right-5 w-14 text-xs rounded ${
                            isDuplicateChecking === '완료' ? 'text-blue-600' : 'text-white bg-blue-600'
                        }`}
                        onClick={() => onDuplicateCheck(name)} // 여기를 수정
                    >
                        {isDuplicateChecking === '완료' ? '완료' : '중복확인'}{' '}
                    </button>
                    )}
                </div>
            </div>
            {/* 에러메시지 표시 */}
            {error && <p className={`bg-white ${errorMessageStyle} text-xs mt-1 px-2`}>{error}</p>}{' '}
        </div>
    );
}

export default InputBox;
