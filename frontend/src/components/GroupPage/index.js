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

    function isPrivate(status) {
        if (status === true) {
            return "Private"
        } else {
            return "Public"
        }
    }

    useEffect(() => {
        dispatch(getGroup(groupId));
    }, [dispatch]);

    return (
        <div className='pageContainer'>
            <div className='homeHeader'>
                <div className='bannerLeft'>
                    <img className="bannerImage" src={group.previewImage} alt="preview for group"/>
                </div>
                <div className='bannerRight'>
                    <h1 className='groupTitle'>{group.name}</h1>
                    <div className='detailBox'>
                        <div className='detailItem'>{group.city}, {group.state}</div>
                        <div className='detailItem'>{group.numMembers} member(s) . {isPrivate(group.private)} group</div>
                    </div>
                </div>
            </div>
            <div className='tabStripe'>
                <div id='blueTab'>About</div>
                <div className='infoTab'>Events</div>
                <div className='infoTab'>Members</div>
                <div className='infoTab'>Photos</div>
                <NavLink exact to={`/groups/${group.id}/events`}>
                    <button className='groupButton'>Create an event</button>
                </NavLink>
                <NavLink exact to={`/groups/${group.id}/edit`}>
                    <button className='groupButton'>Edit this group</button>
                </NavLink>
                    <button className='groupButton' onClick={deleterFunc}>Delete this group</button>
            </div>
            <div className='homeBody'>
                <div className='aboutTab'>
                    What we're about
                    <p className='aboutText'>{group.about}</p>
                </div>
            </div>
        </div>
    )
}

export default GroupPage;
