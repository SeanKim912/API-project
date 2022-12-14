import { NavLink } from 'react-router-dom';
import './UserHome.css';

function UserHome() {
    return (
        <div>
            <div className='welcome'>
                <div className='text'>
                    <h2>Welcome, User 👋</h2>
                    <p>Events from your groups</p>
                </div>
            </div>
            <div className='userInfo'>
                <div className='generalInfo'>
                    <div className='calendar'></div>
                    <div className='timeframeFilter'></div>
                    <div className='yourInfo'>
                        <div className='yourEvents'>
                            <div className='infoHeader'>
                                <h2>Your next event</h2>
                                <div className='linkBlock'>
                                    <a>See all your events</a>
                                </div>
                            </div>
                            <div className='infoBody'>
                                <a>Discover events</a>
                            </div>
                        </div>
                        <div className='yourGroups'>
                            <div className='infoHeader'>
                                <h2>Your groups</h2>
                                <div className='linkBlock'>
                                    <NavLink exact to="/groups">See all your groups</NavLink>
                                </div>
                            </div>
                            <div className='infoBody'>
                                <a>Discover groups</a>
                            </div>
                        </div>
                        <div className='yourInterests'>
                            <div className='infoHeader'>
                                <h2>Your interests</h2>
                                <div className='linkBlock'>
                                    <p>*Feature in development*</p>
                                    <a>See all your interests</a>
                                </div>
                            </div>
                            <div className='infoBody'>
                                <a>Select interests</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='suggested/upcoming'>

                </div>
            </div>
        </div>
    );
};

export default UserHome;
