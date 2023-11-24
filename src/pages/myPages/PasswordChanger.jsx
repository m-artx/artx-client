import React, { useState } from 'react';
import MoModal from '../../components/shared/MoModal';

const PasswordChanger = ({ isOpen, onClose }) => {
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = () => {
        // Implement your password change logic here
        console.log("Password Changed to: ", newPassword);
        // Close the modal after changing the password
        onClose();
    };

    return (
        <MoModal
            isOpen={isOpen}
            onClose={onClose}
            className="modal w-1/2" // Add a custom class for the modal container
            overlayClassName="modal-overlay" // Add a custom class for the modal overlay
            contentLabel="Change Password Modal"
        >
            <div className="bg-white p-4">
                <h3 className="text-lg font-semibold">Please enter a new password</h3>
                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded mb-4"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePasswordChange}
                >
                    Change Password
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </div>
        </MoModal>
    );
};

export default PasswordChanger;