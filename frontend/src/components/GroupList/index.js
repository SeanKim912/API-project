import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/group';
import { NavLink } from 'react-router-dom';
import './GroupList.css'

const GroupList = () => {
    const dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groupState.allGroups);
    const groups = Object.values(groupsObj);

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
                            <div>
                                <img className='preview' src={group.previewImage} alt="preview for group"/>
                                <div className='details'>
                                    <div className='title'>
                                        <h3 className='name'>{group.name}</h3>
                                        <h3 className='location'>{group.city}, {group.state}</h3>
                                    </div>
                                    <p>{group.about}</p>
                                    <div className='stats'>{group.numMembers} . {group.private}</div>
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