import React from 'react';
import { getUser, removeUserSession } from '../../middlewares/common';
import { useNavigate } from 'react-router-dom'

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
            Welcome {user.username}!<br /><br /> - Need Login Demo
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    );
}

export default PersonalPage;
