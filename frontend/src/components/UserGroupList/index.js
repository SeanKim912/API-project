import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserGroups } from "../../store/group";
import { NavLink } from "react-router-dom";
import './UserGroupList.css'

const UserGroupList = () => {
    const dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groupState.allGroups);
    const groups = Object.values(groupsObj);

    useEffect(() => {
        dispatch(getUserGroups());
    }, [dispatch]);

    return (
        <div className="main">
            <div className="columns">
                <div className="homeLink">
                    <div className="back-icon"></div>
                    <NavLink exact to="/home">Back to home page</NavLink>
                </div>
                <div className="list-column">
                    <h1>Your groups</h1>
                    <div className="list">
                        <h3>Member</h3>
                        <ul>
                            {groups.map((group) => {
                                return (
                                    <li>
                                        <NavLink exact to={`/groups/${group.id}`}>
                                            <img alt={group.name} src={group.previewImage}></img>
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserGroupList;
