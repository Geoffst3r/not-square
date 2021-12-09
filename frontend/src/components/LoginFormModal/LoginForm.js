import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import SignupForm from '../SignupFormModal/SignupForm';
import { Modal } from '../../context/Modal';
import './LoginForm.css'

function LoginForm({ callSetter }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [errors, setErrors] = useState([]);

    const closeLoginRenderSignup = () => {
        callSetter();
        return (
            <>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SignupForm />
                    </Modal>
                )}
            </>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <label className="login-input">
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label className="login-input">
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <ul className="login-errors">
                {errors.length > 0 &&
                    errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
            </ul>
            <div className="demo-user-and-signup">
                <button
                    onClick={() => closeLoginRenderSignup()}
                >Don't have an account? Sign up!</button>
                <button
                    type="submit"
                    onClick={() => {
                        setCredential('Demo-lition')
                        setPassword('password')
                    }}
                >Demo</button>
            </div>
            <button type="submit" className="login" onClick={() => callSetter()} >Log In</button>
        </form>
    );
}

export default LoginForm;
