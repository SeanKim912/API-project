import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startEvent } from "../../store/event";

function CreateEventPage() {
    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.eventState.singleEvent);
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

        const imagePayload ={
            url,
            preview: true
        };

        if (user) {
            setErrors([]);
            return dispatch(startEvent(groupId, eventPayload, imagePayload))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        } else {
            return setErrors(['Must be logged in to create an event']);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Description
                <textarea
                    value={description}
                    placeholder="Describe your event"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Type
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option value={''} defaultValue></option>
                    <option value={"In person"}>In person</option>
                    <option value={"Online"}>Online</option>
                </select>
            </label>
            <label>
                Capacity
                <input
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                />
            </label>
            <label>
                Price
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <label>
                Start Date
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </label>
            <label>
                End Date
                <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            </label>
            <label>
                Group image
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Image url here"
                />
            </label>
            <button type="submit">Create Event</button>
        </form>
    );
};

export default CreateEventPage;
