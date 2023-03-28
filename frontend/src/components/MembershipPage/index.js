import { useEffect } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { groupMemberships } from '../../store/membership';
import './MembershipPage.css';

const MembershipPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const user = useSelector(state => state.session.user);
    const allMembers = useSelector(state => state.membershipState.groupMemberships);
    const membersArr = Object.values(allMembers);
    const approvedArr = membersArr.filter(member => member.Membership.status === 'member');
    const pendingArr = membersArr.filter(member => member.Membership.status === 'pending');
    console.log("WHAT MEMBERS", membersArr)

    useEffect(() => {
        dispatch(groupMemberships(groupId));
    }, [dispatch])

    return (
        <>
            <h1 className='membersTitle'>Pending</h1>
            {pendingArr.map(member => {
                return <div className='membersCard'>{member.firstName} {member.lastName} {member.Membership.status}</div>
            })}
            <h1 className='membersTitle'>Members</h1>
            {approvedArr.map(member => {
                return <div className='membersCard'>{member.firstName} {member.lastName} {member.Membership.status}</div>
            })}
        </>
    )
}

export default MembershipPage;
