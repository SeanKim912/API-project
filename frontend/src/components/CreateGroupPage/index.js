import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGroup } from "../../store/group";
import { useHistory } from "react-router-dom";
import './CreateGroupPage.css'

function CreateGroupPage() {
    const user = useSelector(state => state.session.user);
    // const group = useSelector(state => state.groupState.singleGroup);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [type, setType] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const groupPayload = {
            name,
            about,
            city,
            state,
            private: isPrivate,
            type
        }

        const imagePayload = {
            url,
            preview: true
        }


        if (user) {
            setErrors([]);
            const newGroup = dispatch(startGroup(groupPayload, imagePayload))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });

            if (newGroup) history.push(`/groups/${newGroup.id}`);
        } else {
            return setErrors(['Must be logged in to create a group']);
        }
    };

    return (
        <div className="pageContainer">
            <img className="modalIcon" src="https://1000marcas.net/wp-content/uploads/2021/07/Meetup-logo-2048x1152.jpg" />
            <h1 className="formHeader">Create Group</h1>
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
                        About
                    </label>
                </div>
                <textarea
                    value={about}
                    placeholder="Describe your group in at least 50 characters"
                    onChange={(e) => setAbout(e.target.value)}
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
                        Private/Public
                    </label>
                </div>
                <select
                    value={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.value)}
                    required
                >
                    <option value={true} defaultValue>Private</option>
                    <option value={false}>Public</option>
                </select>
                <div className="fieldLabel">
                    <label>
                        City
                    </label>
                </div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        State
                    </label>
                </div>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        Group Image
                    </label>
                </div>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Image url here"
                />
                <button className="formButton" type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default CreateGroupPage;
