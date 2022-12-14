import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/group';

const GroupList = () => {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups);

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);

    return (
        <div>
            
        </div>
    )
}

export default GroupList;
