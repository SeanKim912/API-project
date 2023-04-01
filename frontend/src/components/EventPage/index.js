import { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, removeEvent } from "../../store/event";
import { groupMemberships } from "../../store/membership";
import { getAttendees, rsvpEvent } from "../../store/attendance";
import './EventPage.css';

const EventPage = () => {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.eventState.singleEvent);
    const allMembers = useSelector(state => state.membershipState.groupMemberships);
    const membersArr = Object.values(allMembers);
    const membership = membersArr.find(member => member.id === user.id);

    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    const deleterFunc = () => {
        dispatch(removeEvent(eventId))
            .then(async (res) => {
                history.push('/')
            });
    }

    const rsvpFunc = () => {
        dispatch(rsvpEvent(eventId));
    }



    useEffect(() => {
        dispatch(getEvent(eventId));
        dispatch(groupMemberships(event.groupId));
        dispatch(getAttendees(eventId));
    }, [dispatch]);

    if (!event.Group) return null

    return (
        <div className="eventPageBody">
            <div className='eventHeader'>
                <h1 className='eventHeaderText'>{event.name}</h1>
            </div>
            <div className='eventBody'>
                <div className="mainColumn">
                    <div className="imageContainer">
                        <img className="eventBannerImage" src={event.previewImage} alt="preview for event" />
                    </div>
                    <div className="aboutContainer">
                        <div>
                            <h2>Details</h2>
                            <p>{event.description}</p>
                        </div>
                    </div>
                </div>
                <div className="sideColumn">
                    <div className="miniEventCard">
                        <div className="miniEventDetail">Begins: {start.toUTCString().slice(0, 22)}</div>
                        <div className="miniEventDetail">Ends: {end.toUTCString().slice(0, 22)}</div>
                        <div className="miniEventDetail">{event.type}</div>
                        <div className="miniEventDetail">Max Capacity: {event.capacity} People</div>
                        <div className="miniEventDetail">Admission: ${event.price}</div>
                    </div>
                    <div className="crudButtons">
                        {membership && (
                                <button className="eventPageButton">Attend this event</button>
                            )
                        }
                        {user.id === event.Group.organizerId && (
                                <>
                                    <NavLink exact to={`/events/${event.id}/edit`}>
                                        <button className="eventPageButton">Edit this event</button>
                                    </NavLink>
                                    <button className="eventPageButton" onClick={deleterFunc}>Delete this event</button>
                                </>
                            )
                        }
                    </div>
                    <div className="dateInfo"></div>
                </div>
            </div>
        </div>
    )
}

export default EventPage;
