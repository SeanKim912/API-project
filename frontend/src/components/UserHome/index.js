import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventList from '../EventList';
import GroupList from '../GroupList';
import './UserHome.css';

function UserHome() {
    const user = useSelector(state => state.session.user);
    const [isEvent, setIsEvent] = useState(true);

    function eventSwitch() {
        setIsEvent(true);
    }

    function groupSwitch() {
        setIsEvent(false);
    }

    return (
        <div className='homeContainer'>
            <div className='welcome'>
                <div className='mainText'>
                    <h2 className='welcomeText'>Welcome, {user.firstName} 👋</h2>
                    <p className='welcomeSubtext'>Events from your groups</p>
                </div>
            </div>
            <div className='userInfo'>
                <div className='generalInfo'>
                    <div className='calendar'></div>
                    <div className='timeframeFilter'></div>
                    <div title="Feature in development" className='yourInfo'>
                        <div className='yourEvents'>
                            <div className='infoHeader'>
                                <h2 className='your'>Your next event</h2>
                                <div className='linkBlock'>
                                    <div className='see'>See all your events</div>
                                </div>
                            </div>
                            <div className='infoBody'>
                                <div className='discover'>Discover events</div>
                            </div>
                        </div>
                        <div className='yourGroups'>
                            <div className='infoHeader'>
                                <h2 className='your'>Your groups</h2>
                                <div className='see'>
                                    {/* <NavLink exact to="/groups/user">See all your groups</NavLink> */}
                                    See all your groups
                                </div>
                            </div>
                            <div className='discover'>Discover groups</div>
                        </div>
                        <div className='yourInterests'>
                            <div className='infoHeader'>
                                <h2 className='your'>Your interests</h2>
                                <div className='linkBlock'>
                                    <div className='see'>See all your interests</div>
                                </div>
                            </div>
                            <div className='discover'>
                                <a>Select interests</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='listDisplay'>
                    {isEvent
                        ? (
                            <>
                                <div className='tab'>
                                    <button className='picked' onClick={eventSwitch}>Events</button>
                                    <button className='unpicked' onClick={groupSwitch}>Groups</button>
                                </div>
                                <EventList />
                            </>
                        )
                        : (
                            <>
                                <div className='tab'>
                                    <button className="unpicked" onClick={eventSwitch}>Events</button>
                                    <button className="picked" onClick={groupSwitch}>Groups</button>
                                </div>
                                <GroupList />
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default UserHome;
