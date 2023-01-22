import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { updateEvent } from "../../store/event";
import './EditEventPage.css'

function EditEventPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const event = useSelector(state => state.eventState.singleEvent);
    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [type, setType] = useState(event.type);
    const [capacity, setCapacity] = useState(event.capacity);
    const [price, setPrice] = useState(event.price);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);
    const { eventId } = useParams();
    const venueId = 1;


    const handleSubmit = (e) => {
        e.preventDefault();

        const eventPayload = {
            id: eventId,
            name,
            description,
            type,
            capacity,
            price,
            startDate,
            endDate,
            venueId
        }

        setErrors([]);

        dispatch(updateEvent(eventPayload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
            .then(async (res) => {
                const data = await res;
                history.push(`/events/${data.id}`);
            });
    };

    return (
        <div className="pageContainer">
            <img className="modalIcon" src="https://1000marcas.net/wp-content/uploads/2021/07/Meetup-logo-2048x1152.jpg" />
            <h1 className="formHeader">Edit Event</h1>
            <form className="inputField" onSubmit={handleSubmit}>
                <ul className="errorField">
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
                <button className="formButton" type="submit">Edit Event</button>
            </form>
        </div>
    );
};

export default EditEventPage;
