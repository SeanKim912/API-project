import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventList from '../EventList';
import './UserHome.css';

function UserHome() {
    const user = useSelector(state => state.session.user);
    return (
        <div>
            <div className='welcome'>
                <div className='text'>
                    <h2>Welcome {user.firstName} 👋</h2>
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
                                    {/* <NavLink exact to="/groups/user">See all your groups</NavLink> */}
                                    See all your groups
                                </div>
                            </div>
                            <div className='infoBody'>
                                <NavLink exact to="/groups">Discover groups</NavLink>
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
                <div className='events'>
                    <EventList />
                </div>
            </div>
        </div>
    );
};

export default UserHome;
