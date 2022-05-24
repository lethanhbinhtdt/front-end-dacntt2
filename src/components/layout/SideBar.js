import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { faBell, faEnvelope, faHouse, faGear } from '@fortawesome/free-solid-svg-icons'

import '../../css/SideBar.css'

function SideBar(props) {

    return (
        <div className='sidebar cursor-pointer'>
            <div className='menu-item active'>
                <span><FontAwesomeIcon icon={faHouse} /></span><h4>Trang chủ</h4>
            </div>
            <div className='menu-item' id='notifications'>
                <span><FontAwesomeIcon icon={faBell} /> <small className='notification-count'>9+</small> </span><h4>Thông báo</h4>
                {/* popup hiển thị thông báo */}
                <div className='notifications-popup'>
                    <div className='d-flex me-2'>
                        <div className='notification-user-avatar'>
                            <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                        </div>
                        <div className='notification-content'>
                            <div><b>Username</b> thích bài đăng của bạn</div>
                            <div className='fs-smaller text-secondary'>2 giờ trước</div>
                        </div>
                    </div>

                    <div className='d-flex me-2'>
                        <div className='notification-user-avatar'>
                            <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                        </div>
                        <div className='notification-content'>
                            <div><b>Username</b> thích bài đăng của bạn</div>
                            <div className='fs-smaller text-secondary'>2 giờ trước</div>
                        </div>
                    </div>

                    <div className='d-flex me-2'>
                        <div className='notification-user-avatar'>
                            <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                        </div>
                        <div className='notification-content'>
                            <div><b>Username</b> thích bài đăng của bạn</div>
                            <div className='fs-smaller text-secondary'>2 giờ trước</div>
                        </div>
                    </div>
                </div>
                {/* END popup thông báo */}
            </div>
            <div className='menu-item' id='message-notifications'>
                <span><FontAwesomeIcon icon={faEnvelope} /> <small className='notification-count'>3</small> </span><h4>Tin nhắn</h4>
            </div>
            <div className='menu-item'>
                <span><FontAwesomeIcon icon={faGear} /></span><h4>Cài đặt</h4>
            </div>


        </div>
    );
}

export default SideBar;
