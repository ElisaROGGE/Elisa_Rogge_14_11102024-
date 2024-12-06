import React from 'react';
import './ValidationModal.css';


interface ValidationModalProps {
    isOpen: boolean
    closeModal: () => void
    title: string
    buttonText: string
    children?: React.ReactNode
}


const ValidationModal: React.FC<ValidationModalProps> = ({isOpen, closeModal, title, buttonText, children}) => {

    return (
        isOpen ? (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>{title}</h2>
                    <div>{children}</div>
                    <button onClick={closeModal}>{buttonText}</button>
                </div>
            </div>
        ) : null
    );
};

export default ValidationModal;