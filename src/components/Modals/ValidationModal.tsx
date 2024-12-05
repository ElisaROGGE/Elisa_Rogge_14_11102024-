import React, { useState } from 'react';
import './ValidationModal.css';


interface ValidationModalProps {
    isOpen: boolean
    closeModal: () => void
}


const ValidationModal: React.FC<ValidationModalProps> = ({isOpen, closeModal}) => {

    return (
        isOpen ? (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Employee Created Successfully</h2>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        ) : null
    );
};

export default ValidationModal;