import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { startEvent } from "../../store/event";
import './CreateEventPage.css'

function CreateEventPage() {
    const user = useSelector(state => state.session.user);
    // const event = useSelector(state => state.eventState.singleEvent);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const { groupId } = useParams();
    const venueId = 1;


    const handleSubmit = (e) => {
        e.preventDefault();

        const eventPayload = {
            venueId,
            name,
            description,
            type,
            capacity,
            price,
            startDate,
            endDate
        };

        const imagePayload = {
            url,
            preview: true
        };


        if (user) {
            setErrors([]);
            const newEvent = dispatch(startEvent(groupId, eventPayload, imagePayload))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });

            if (newEvent) history.push(`/events/${newEvent.id}`);
        } else {
            return setErrors(['Must be logged in to create an event']);
        }
    };

    return (
        <div className="pageContainer">
            <img className="modalIcon" src="https://1000marcas.net/wp-content/uploads/2021/07/Meetup-logo-2048x1152.jpg" />
            <h1 className="formHeader">Create Event</h1>
            <form className="inputField" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="fieldLabel">
                    <label>
                        Name
                    </label>
                </div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        Description
                    </label>
                </div>
                <textarea
                    value={description}
                    placeholder="Describe your event"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        Type
                    </label>
                </div>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option value={''} defaultValue></option>
                    <option value={"In person"}>In person</option>
                    <option value={"Online"}>Online</option>
                </select>
                <div className="fieldLabel">
                    <label>
                        Capacity
                    </label>
                </div>
                <input
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        Price
                    </label>
                </div>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        Start Date
                    </label>
                </div>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        End Date
                    </label>
                </div>
                <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        Event Image
                    </label>
                </div>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Image url here"
                />
                <button className="formButton" type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEventPage;
