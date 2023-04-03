import { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup, removeGroup } from '../../store/group';
import { membershipRequest, groupMemberships, membershipDelete } from '../../store/membership';
import './GroupPage.css'

const GroupPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();
    const user = useSelector(state => state.session.user);
    const group = useSelector(state => state.groupState.singleGroup);
    const allMembers = useSelector(state => state.membershipState.groupMemberships);
    const membersArr = Object.values(allMembers);
    const membership = membersArr.find(member => member.id === user.id);
    const pendingText = () => {
        if (membership?.Membership.status === 'pending') {
            return <button className='groupButton'>Pending...</button>
        } else if (membership?.Membership.status === 'member') {
            return <button className='groupButton' onClick={leaveFunc}>Leave this group</button>
        } else {
            return <button className='groupButton' onClick={requestFunc}>Join this group</button>
        }
    }
    const numPending = membersArr.filter(member => member.Membership?.status === 'pending');
    const [pend, setPend] = useState(true);

    const deleterFunc = () => {
        dispatch(removeGroup(groupId))
            .then(async (res) => {
                history.push('/');
            });
    }

    const requestFunc = () => {
        dispatch(membershipRequest(groupId))
            .then(setPend(!pend));
    }

    const leaveFunc = () => {
        const membershipPayload = {
            memberId: user.id
        }
        dispatch(membershipDelete(groupId, membershipPayload))
            .then(setPend(!pend));
    }

    function isPrivate(status) {
        if (status === true) {
            return "Private"
        } else {
            return "Public"
        }
    }

    useEffect(() => {
        dispatch(getGroup(groupId));
        dispatch(groupMemberships(groupId));
    }, [dispatch, pend]);

    return (
        <div className='pageContainer'>
            <div className='homeHeader'>
                <div className='bannerLeft'>
                    <img className="bannerImage" src={group.previewImage} alt="preview for group" />
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
                <div className='infoTab' title='Feature in development'>Events</div>
                <div className='infoTab' title='Feature in development'>Photos</div>
                {user.id === group.organizerId
                    ? (
                        <>
                            <NavLink exact to={`/memberships/${group.id}`}>
                                <button className='groupButton'>Memberships ({numPending.length})</button>
                            </NavLink>
                            <NavLink exact to={`/groups/${group.id}/events`}>
                                <button className='groupButton'>Create an event</button>
                            </NavLink>
                            <NavLink exact to={`/groups/${group.id}/edit`}>
                                <button className='groupButton'>Edit this group</button>
                            </NavLink>
                            <button className='groupButton' onClick={deleterFunc}>Delete this group</button>
                        </>
                    ) : (
                        <>
                            {pendingText()}
                        </>
                    )}
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
