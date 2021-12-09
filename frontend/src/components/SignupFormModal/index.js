import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import LoginForm from '../LoginFormModal/LoginForm';

function SignupFormModal({ title }) {
    const [showLoginModal, setShowLoginModal] = useState(true);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [login, setLogin] = useState(false);

    const callSetter = () => {
        setShowSignupModal(false);
        setLogin(true);
    };


    if (login) {
        return (
            <>
                {showLoginModal && (
                    <Modal onClose={() => setShowLoginModal(false)}>
                        <LoginForm />
                    </Modal>
                )}
            </>
        );
    } else {
        return (
            <>
                <button className={title === 'Sign up' ? 'signup-modalButton' : 'signup-else'} onClick={() => setShowSignupModal(true)}>{title}</button>
                {showSignupModal && (
                    <Modal onClose={() => setShowSignupModal(false)}>
                        <SignupForm callSetter={callSetter} />
                    </Modal>
                )}
            </>
        );
    }
}

export default SignupFormModal;
