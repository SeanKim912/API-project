import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <ul className='corners'>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                {isLoaded && (
                    <ul>
                        <li>
                            <NavLink exact to="/groups/start">Start a new group</NavLink>
                        </li>
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    </ul>
                    )}
            </ul>
        </>
    );
}

export default Navigation;
