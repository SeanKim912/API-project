import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="profileContainer">
            <button onClick={openMenu}>
                <img className="profileIcon" src="https://imgs.search.brave.com/6-wm4BFl7N910tM2Y2nHnJuhIUl0oniR4Q1Dog1GQNU/rs:fit:980:980:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2lt/Z18yMDY5NzYucG5n" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user && (
                    <div className="menu">
                        <li className="info">{user.username}</li>
                        <li className="info">{user.firstName} {user.lastName}</li>
                        <li className="info">{user.email}</li>
                        <li className="info">
                            <button className="logoutButton" onClick={logout}>Log Out</button>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default ProfileButton;
