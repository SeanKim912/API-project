import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const demoInput = () => {
        setCredential("FakeUser");
        setPassword("password");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };


    return (
        <div className="formBody">
            <img className="modalIcon" src="https://1000marcas.net/wp-content/uploads/2021/07/Meetup-logo-2048x1152.jpg"/>
            <h1 className="modalHeader">Log In</h1>
            <form className="inputField" onSubmit={handleSubmit}>
                <ul className="errorField">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="fieldLabel">
                    <label>
                        Username or Email
                    </label>
                </div>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                <div className="fieldLabel">
                    <label>
                        Password
                    </label>
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="formButton" type="submit">Log In</button>
                <button className="formButton" onClick={demoInput}>Demo User</button>
            </form>
        </div>
    );
}

export default LoginFormModal;
