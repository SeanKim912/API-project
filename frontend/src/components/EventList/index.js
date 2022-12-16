import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, clearEvent } from "../../store/event";
import { NavLink } from "react-router-dom";

const EventList = () => {
    const dispatch = useDispatch();
    const eventsObj = useSelector(state => state.eventState.allEvents);
    const events = Object.values(eventsObj);

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(clearGroup());
    // }, [dispatch]);

    return (
        <div id="main">
            <div>
                <div id="tabsFilters"></div>
                <div id="list">
                    {events.map((event) => {
                        return (
                        <NavLink exact to={`/events/${event.id}`}>
                            <div>
                                <div className='preview'>{event.previewImage}</div>
                                <div className='details'>
                                    <div className='title'>
                                        <h3 className='time'>{event.startDate}</h3>
                                        <h3 className='name'>{event.name}</h3>
                                        <h3 className='group'>{event.Group.name} . {event.Group.city}, {event.Group.state}</h3>
                                        <div className='cardFooter'>
                                            <div className='attendees'>{event.numAttending} attendee(s)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default EventList;
