import React from "react";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-primary-900 rounded-xl shadow-lg p-6 w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white hover:text-red-500"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
