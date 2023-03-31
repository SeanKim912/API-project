import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { groupMemberships, membershipApproval } from '../../store/membership';
import './MembershipPage.css';

const MembershipPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const allMembers = useSelector(state => state.membershipState.groupMemberships);
    const membersArr = Object.values(allMembers);
    const approvedArr = membersArr?.filter(member => member?.Membership?.status === 'member');
    const pendingArr = membersArr?.filter(member => member?.Membership?.status === 'pending');
    const [approve, setApprove] = useState(true);

    useEffect(() => {
        dispatch(groupMemberships(groupId));
    }, [dispatch, approve]);

    return (
        <>
            <h1 className='membersTitle'>Pending</h1>
            {pendingArr.map(member => {
                return (
                    <div>
                        <div className='membersCard'>{member.firstName} {member.lastName} {member.Membership.status}</div>
                        <button className='groupButton' onClick={() => {
                            const membershipPayload = {
                                memberId: member.id,
                                status: 'member'
                            }
                            
                            dispatch(membershipApproval(groupId, membershipPayload))
                                .then(async (res) => {
                                    const data = await res;
                                    setApprove(!approve);
                                })
                        }}>Approve</button>
                    </div>
                )
            })}
            <h1 className='membersTitle'>Members</h1>
            {approvedArr.map(member => {
                return <div className='membersCard'>{member.firstName} {member.lastName} {member.Membership.status}</div>
            })}
        </>
    )
}

export default MembershipPage;
