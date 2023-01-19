import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <ul className='corners'>
                <li className='leftCorner'>
                    <NavLink exact to="/">
                        <img className='logo' src='https://1000marcas.net/wp-content/uploads/2021/07/Meetup-logo-2048x1152.jpg'/>
                    </NavLink>
                </li>
                {sessionUser
                ?   <ul className='loggedInCorner'>
                            <NavLink exact to="/groups/start">
                                <button className='startButton'>
                                    Start a new group
                                </button>
                            </NavLink>
                            <ProfileButton user={sessionUser} />
                    </ul>
                :   <ul className='rightCorner'>
                        <li className='language' title='Feature in development'>
                            <img className="langIcon" src='https://imgs.search.brave.com/dTp9jyBC3hlJxON3vzuuuaebjAIr7DsPcLaiA1gMPAY/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZXNzZW50aWFs/cy10aGljay1saW5l/cy8xMjgvd29ybGQt/Z2xvYmUtbGFuZ3Vh/Z2UtaW50ZXJuYXRp/b25hbC01MTIucG5n'></img>
                            <div className='english'>English</div>
                        </li>
                        <li>
                            <OpenModalButton
                                buttonText="Login"
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li>
                            <OpenModalButton
                                buttonText="Sign Up"
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </ul>
                }
            </ul>
        </>
    );
}

export default Navigation;
