import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ title }) {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const callSetter = () => {
        setShowLoginModal(false);
    };

    return (
        <>
            <button className={title === 'Log in' ? 'login-modalButton' : 'login-else'} onClick={() => setShowLoginModal(true)}>{title}</button>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm callSetter={callSetter} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
