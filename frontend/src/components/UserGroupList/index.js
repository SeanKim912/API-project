import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserGroups } from "../../store/group";
import { NavLink } from "react-router-dom";
import './UserGroupList.css'

const UserGroupList = () => {
    const dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groupState.allGroups);
}

export default UserGroupList;
