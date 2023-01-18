import { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, removeEvent } from "../../store/event";
import './EventPage.css';

const EventPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const event = useSelector(state => state.eventState.singleEvent);
    const group = useSelector(state => state.eventState.singleEvent.Group);
    const organizer = useSelector(state => state.eventState.singleEvent.Organizer);
    const { eventId } = useParams();

    const deleterFunc = () => {
        dispatch(removeEvent(eventId))
            .then(async (res) => {
                history.push('/')
            });
    }

    useEffect(() => {
        dispatch(getEvent(eventId))
    }, [dispatch]);

    return (
        <div className="eventPageBody">
            <div className='eventHeader'>
                <h1 className='eventHeaderText'>{event.name}</h1>
            </div>
            <div className='eventBody'>
                <div className="mainColumn">
                    <div className="imageContainer">
                        <img className="eventBannerImage" src={event.previewImage} alt="preview for event"/>
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
                        <div className="miniEventDetail">Begins: {event.startDate}</div>
                        <div className="miniEventDetail">Ends: {event.endDate}</div>
                        <div className="miniEventDetail">{event.type}</div>
                        <div className="miniEventDetail">Max Capacity: {event.capacity} People</div>
                        <div className="miniEventDetail">Admission: ${event.price}</div>
                    </div>
                    <div className="crudButtons">
                        {/* <NavLink exact to={`/events/${event.id}/edit`}>
                            <button className="eventPageButton">Edit this event</button>
                        </NavLink> */}
                        <button className="eventPageButton" onClick={deleterFunc}>Delete this event</button>
                    </div>
                    <div className="dateInfo"></div>
                </div>
            </div>
        </div>
    )
}

export default EventPage;
