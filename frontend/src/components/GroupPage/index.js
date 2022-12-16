import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup, removeGroup } from '../../store/group';
import './GroupPage.css'

const GroupPage = () => {
    const dispatch = useDispatch();
    const group = useSelector(state => state.groupState.singleGroup);
    const { groupId } = useParams();

    const deleterFunc = () => { dispatch(removeGroup(groupId))}

    useEffect(() => {
        dispatch(getGroup(groupId));
    }, [dispatch]);

    return (
        <div>
            <div className='homeHeader'>
                <div className='bannerLeft'>
                    <div>{group.previewImage}</div>
                </div>
                <div className='bannerRight'>
                    <h1>{group.name}</h1>
                    <div className='details'>
                        <div>{group.city}, {group.state}</div>
                        <div>{group.numMembers} . {group.private}</div>
                    </div>
                </div>
            </div>
            <div className='tabStripe'>
                <NavLink exact to={`/groups/${group.id}/edit`}>
                    <button>Edit this group</button>
                </NavLink>
                    <button onClick={deleterFunc()}>Delete this group</button>
            </div>
            <div className='homeBody'>
                <div className='aboutTab'>
                    About
                    <p>{group.about}</p>
                </div>
                <div className='eventsTab'>
                    Events
                </div>
            </div>
        </div>
    )
}

export default GroupPage;
