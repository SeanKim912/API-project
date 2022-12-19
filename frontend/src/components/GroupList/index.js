import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/group';
import { NavLink } from 'react-router-dom';
import './GroupList.css'

const GroupList = () => {
    const dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groupState.allGroups);
    const groups = Object.values(groupsObj);
    function isPrivate(status) {
        if (status === true) {
            return "Private"
        } else {
            return "Public"
        }
    }

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(clearGroup());
    // }, [dispatch]);

    return (
        <div id="main">
            <div>
                <div id="tabsFilters"></div>
                <div id="list">
                    {groups.map((group) => {
                        return (
                        <NavLink exact to={`/groups/${group.id}`}>
                            <div className="groupCard">
                                <img className='preview' src={group.previewImage} alt="preview for group"/>
                                <div className='details'>
                                    <h3 className='groupCardName'>{group.name}</h3>
                                    <h3 className='groupCardLocation'>{group.city}, {group.state}</h3>
                                    <p className='groupCardAbout'>{group.about}</p>
                                    <div className='groupCardStats'>{group.numMembers} member(s) . {isPrivate(group.private)}</div>
                                </div>
                            </div>
                        </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default GroupList;
