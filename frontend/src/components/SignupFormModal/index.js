import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const demoInput = () => {
        setEmail("demo@email.com");
        setUsername("DemoUser");
        setFirstName("Demo");
        setLastName("User");
        setPassword("password");
        setConfirmPassword("password");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="formBody">
            <img className="modalIcon" src="https://1000marcas.net/wp-content/uploads/2021/07/Meetup-logo-2048x1152.jpg"/>
            <h1 className="modalHeader">Sign Up</h1>
            <form className="inputField" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="fieldLabel">
                    <label>
                        Email
                    </label>
                </div>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        Username
                    </label>
                </div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        First Name
                    </label>
                </div>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}                        required
                />
                <div className="fieldLabel">
                    <label>
                        Last Name
                    </label>
                </div>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}                        required
                />
                <div className="fieldLabel">
                    <label>
                        Password
                    </label>
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}                        required
                />
                <div className="fieldLabel">
                    <label>
                        Confirm Password
                    </label>
                </div>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}                        required
                />
                <button className="formButton" type="submit">Sign Up</button>
                <button className="formButton" onClick={demoInput}>Demo User</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
