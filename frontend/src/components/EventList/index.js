import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from "../../store/event";
import { NavLink } from "react-router-dom";
import './EventList.css'

const EventList = () => {
    const dispatch = useDispatch();
    const eventsObj = useSelector(state => state.eventState.allEvents);
    const events = Object.values(eventsObj);

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    return (
        <div id="main">
            <div>
                <div id="tabsFilters"></div>
                <div id="list">
                    {events.map((event) => {
                        const start = new Date(event.startDate);
                        return (
                        <NavLink exact to={`/events/${event.id}`}>
                            <div className="eventCard">
                                <img className='preview' src={event.previewImage} alt="preview for event"/>
                                <div className='details'>
                                    <h3 className='eventListTime'>{start.toUTCString().slice(0, 22)}</h3>
                                    <h3 className='eventListName'>{event.name}</h3>
                                    <h3 className='eventListGroup'>{event.Group?.name} . {event.Group?.city}, {event.Group?.state}</h3>
                                    <div className='eventListAttendees'>{event.numAttending} attendee(s)</div>
                                </div>
                            </div>
                        </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default EventList;
