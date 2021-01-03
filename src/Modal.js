import React from 'react';

const Modal = ({isModalOpen, modalContent, closeModal}) => {
    return (
        <div className={`${isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}`}>
            <div className="modal-container">
                <button 
                    className="close-modal-btn"
                    onClick={closeModal}
                >x</button>
                <p>{modalContent}</p>
            </div>
        </div>
    )
}

export default Modal;