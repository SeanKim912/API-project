import { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, removeEvent } from "../../store/event";
import { confirmMembership } from "../../store/membership";
import { getAttendees, confirmAttendee, rsvpEvent, rsvpUpdate } from "../../store/attendance";
import './EventPage.css';

const EventPage = () => {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.eventState.singleEvent);
    const membership = useSelector(state => state.membershipState.singleMembership);
    const attendances = useSelector(state => state.attendanceState.allAttendances);
    const attendanceArr = Object.values(attendances);
    const attendee = useSelector(state => state.attendanceState.singleAttendance);
    console.log("ATTENDEE", attendee);
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const [rsvp, setRSVP] = useState(true);
    const [attend, setAttend] = useState("");
    let status = "notMember"

    if (!membership.id) {
        status = "notMember"
    } else if (membership.id && !attendee.id) {
        status = "notResponded"
    } else if (membership.id && attendee.id) {
        status = "responded"
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const rsvpPayload = {
            userId: user.id,
            status: attend
        }

        dispatch(rsvpUpdate(eventId, rsvpPayload))
            .then(setRSVP(!rsvp))
    }

    const deleterFunc = () => {
        dispatch(removeEvent(eventId))
            .then(async (res) => {
                history.push('/')
            });
    }

    const rsvpFunc = () => {
        dispatch(rsvpEvent(eventId))
            .then(setRSVP(!rsvp));
    }

    useEffect(() => {
        dispatch(getEvent(eventId));
        dispatch(confirmMembership(eventId));
        dispatch(getAttendees(eventId));
        dispatch(confirmAttendee(eventId));
    }, [dispatch, rsvp]);

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
                        {status === "notMember" && (
                            <div>Only members can RSVP</div>
                        )}
                        {status === "notResponded" && (
                            <button className="eventPageButton" onClick={rsvpFunc}>Attend this event</button>
                        )}
                        {status === "responded" && (
                            <>
                                <div>{attendee.status.toUpperCase()}</div>
                                <form onSubmit={handleSubmit}>
                                    <select
                                        value={attend}
                                        onChange={(e) => setAttend(e.target.value)}
                                    >
                                        <option value={"attending"}>Attending</option>
                                        <option value={"not attending"}>Not Attending</option>
                                        <option value={"maybe"}>Maybe</option>
                                    </select>
                                    <button className="formButton" type="submit">Edit RSVP</button>
                                </form>
                            </>
                        )}
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
