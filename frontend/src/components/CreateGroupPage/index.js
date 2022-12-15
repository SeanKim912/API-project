import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGroup } from "../../store/group";
import './CreateGroupPage.css'

function CreateGroupPage() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [type, setType] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name,
            about,
            city,
            state,
            private: isPrivate,
            type
        }
        if (user) {
            setErrors([]);
            return dispatch(startGroup(payload))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        }
        return setErrors(['Must be logged in to create a group']);
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
                About
                <textarea
                    value={about}
                    placeholder="Describe your group in at least 50 characters"
                    onChange={(e) => setAbout(e.target.value)}
                />
            </label>
            <label>
                Type
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value={''} defaultValue></option>
                    <option value={"In person"}>In person</option>
                    <option value={"Online"}>Online</option>
                </select>
            </label>
            <label>
                Private/Public
                <select
                    value={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.value)}
                >
                    <option value={true} defaultValue>Private</option>
                    <option value={false}>Public</option>
                </select>
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Create Group</button>
        </form>
    );
};

export default CreateGroupPage;
