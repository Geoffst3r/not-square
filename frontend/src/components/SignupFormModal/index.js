import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ title }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className={title === 'Sign up' ? 'signup-modalButton' : 'signup-else'} onClick={() => setShowModal(true)}>{title}</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
