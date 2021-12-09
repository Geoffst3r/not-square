import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className="user-stuff">
                <p className="greeting">{`Hello, ${user.username}!`}</p>
                <button onClick={openMenu} className='profile-button'>
                    <i className="fas fa-user-circle fa-2x" />
                    <i className="fas fa-angle-double-down fa-lg" />
                </button>
            </div>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>
                        <button className="logout-profile-button" onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
