import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ modal, title }) {
    const [showModal, setShowModal] = useState(modal);

    return (
        <>
            <button onClick={() => setShowModal(true)}>{title}</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
