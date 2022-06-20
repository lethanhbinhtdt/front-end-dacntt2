import React from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Popup from 'reactjs-popup';

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
            {/* trang chủ */}
            <div className='menu-item'>
                <span><FontAwesomeIcon icon={faHouse} /></span><h5>Trang chủ</h5>
            </div>

            {/* thông báo */}
            <Popup
                trigger={
                    <div className='menu-item active' id='notifications'>
                        <span><FontAwesomeIcon icon={faBell} /> <small className='notification-count'>9+</small> </span><h5>Thông báo</h5>
                    </div>
                }
                position='right center'
            >
                <div className='menu-popup notifications-popup'>
                    <NotificationList />
                </div>
            </Popup>

            {/* tin nhắn */}
            <div className='menu-item' id='message-notifications' onClick={navigateChat}>
                <span><FontAwesomeIcon icon={faEnvelope} /> <small className='notification-count'>3</small> </span><h5>Tin nhắn</h5>
            </div>
            
            {/* cài đặt */}
            <Popup
                trigger={
                    <div className='menu-item'>
                        <span><FontAwesomeIcon icon={faGear} /></span><h5>Cài đặt</h5>
                    </div>
                }
                position='right center'
            >
                <div className='menu-popup d-flex flex-column'>
                    <button type='button' class='btn btn-success mb-2'><Link className='btn-link-text' to={`/account/id/setting`}>Chỉnh sửa thông tin cá nhân</Link></button>
                    <button type='button' class='btn btn-danger'><Link className='btn-link-text' to='/logout'>Đăng xuất</Link></button>
                </div>
            </Popup>
            {/*  */}
        </div>
    );
}

export default SideBar;
