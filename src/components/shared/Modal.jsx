import React from 'react';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="">
            <div className="">{children}</div>

            <div className="bg-white">
                <button onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}

export default Modal;
