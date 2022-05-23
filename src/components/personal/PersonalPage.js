import React, { useEffect, useState } from 'react';
import { getUser, removeUserSession } from '../../middlewares/common';
import { useNavigate } from 'react-router-dom'

import PostCard from '../postCard/PostCard';

function PersonalPage(props) {
    const user = getUser();
    const navigate = useNavigate()
    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
        navigate('/login', { replace: true })
    }

    return (
        <div>
            {/* Welcome {user.username}!<br /><br /> - Need Login Demo */}
            {/* <input type='button' onClick={handleLogout} value='Logout' /> */}
            <div className='row mt-3'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='mb-3 mx-3'><PostCard/></div>
                    <div className='mb-3 mx-3'><PostCard/></div>
                    <div className='mb-3 mx-3'><PostCard/></div>
                </div>

                <div className='col-md-3'></div>
            </div>
        </div>
    );
}

export default PersonalPage;
