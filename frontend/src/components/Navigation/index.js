import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li className='user-interact'>
                <ProfileButton user={sessionUser} />
            </li>
        );
    } else {
        sessionLinks = (
            <li className='user-interact'>
                <LoginFormModal title='Log in' />
                <SignupFormModal title='Sign Up' />
            </li>
        );
    }

    return (
        <ul className="navbar">
            <li>
                <NavLink exact to="/" className="home-redirect">NotSquare</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
