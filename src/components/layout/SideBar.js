import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { faBell, faEnvelope, faHouse, faGear } from '@fortawesome/free-solid-svg-icons'

import NotificationList from '../notification/NotificationList';

import '../../css/SideBar.css'

function SideBar() {

    const navigate = useNavigate();

    function navigateChat() {
        navigate('/chat', { replace: true });
    }
    return (
        <div className='sidebar cursor-pointer'>
            <div className='menu-item'>
                <span><FontAwesomeIcon icon={faHouse} /></span><h5>Trang chủ</h5>
            </div>
            <div className='menu-item active' id='notifications'>
                <span><FontAwesomeIcon icon={faBell}/> <small className='notification-count'>9+</small> </span><h5>Thông báo</h5>
                {/* popup hiển thị thông báo */}
                <div className='notifications-popup'>
                    <NotificationList/>
                </div>
                {/* END popup thông báo */}
            </div>
            <div className='menu-item' id='message-notifications' onClick={navigateChat}>
                <span><FontAwesomeIcon icon={faEnvelope} /> <small className='notification-count'>3</small> </span><h5>Tin nhắn</h5>
            </div>
            <div className='menu-item'>
                <span><FontAwesomeIcon icon={faGear} /></span><h5>Cài đặt</h5>
            </div>


        </div>
    );
}

export default SideBar;
