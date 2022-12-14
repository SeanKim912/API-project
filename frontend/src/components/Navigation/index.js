import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <ul>
                </ul>
                <li>
                    <NavLink exact to="/groups/start">Start a new group</NavLink>
                </li>
                <li>
                    <NavLink exact to="/chats">Chat</NavLink>
                </li>
                <li>
                    <NavLink exact to="/notifications">Notifications</NavLink>
                </li>
                    {isLoaded && (
                        <li>
                    <ProfileButton user={sessionUser} />
                </li>
                    )}

            </ul>
        </>
    );
}

export default Navigation;
