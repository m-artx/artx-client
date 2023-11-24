import React from 'react';
import ReactModal from 'react-modal';



// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

function MoModal({ isOpen, onClose, children }) {
    const handleModalClose = () => {
        if (onClose) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="">
            <ReactModal isOpen={isOpen} onRequestClose={handleModalClose}>
                {children}
            </ReactModal>
        </div>
    );
}

export default MoModal;
