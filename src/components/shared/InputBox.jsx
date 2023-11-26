import React, { useState, useEffect } from 'react';

function InputBox({ label, name, type, value, onChange, error, placeholder, onDuplicateCheck, isDuplicateChecking }) {
    const errorMessageStyle = error === '완료' ? 'text-blue-500' : 'text-red-300';

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
                    placeholder={placeholder}
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
