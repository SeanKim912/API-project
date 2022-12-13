import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import UserHome from '../UserHome';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink exact to="/lp/how-to-group-start">Start a new group</NavLink>
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
            <UserHome />
        </>
    );
}

export default Navigation;
