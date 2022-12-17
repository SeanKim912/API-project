import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, removeEvent } from "../../store/event";
import './EventPage.css';

const EventPage = () => {
    const dispatch = useDispatch();
    const event = useSelector(state => state.eventState.singleEvent);
    const { eventId } = useParams();

    const deleterFunc = () => { dispatch(removeEvent(eventId))}

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [dispatch]);

    return (
        <div>
            <div className='eventHeader'>
                <h1>{event.name}</h1>
            </div>
            <div className='eventBody'>
                <div className="mainColumn">
                    <div className="imageContainer">
                        <img className="preview" src={event.previewImage} alt="preview for event"/>
                    </div>
                    <div className="aboutContainer">
                        <div>
                            <h2>Details</h2>
                            <p>{event.description}</p>
                        </div>
                    </div>
                </div>
                <div className="sideColumn">
                    <div className="groupCard">

                    </div>
                    <div className="crudButtons">
                        <NavLink exact to={`/events/${event.id}/edit`}>
                            <button>Edit this event</button>
                        </NavLink>
                            <button onClick={deleterFunc}>Delete this event</button>
                    </div>
                    <div className="dateInfo"></div>
                </div>
            </div>
        </div>
    )
}

export default EventPage;
