import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
// import SignupForm from '../SignupFormModal/SignupForm'


function LoginFormModal({ title }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    // const [showSignupModal, setShowSignupModal] = useState(true);

    const callSetter = () => {
        return setShowLoginModal(false);
        // return (
        //     <>
        //         {/* {showSignupModal && ( */}
        //         <Modal>
        //             <SignupForm />
        //         </Modal>
        //         {/* )} */}
        //     </>
        // );
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
