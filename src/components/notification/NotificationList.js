import React from 'react';

function NotificationList() {
    return (
        <div>
            <div className='d-flex mb-2'>
                <div className='notification-user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                </div>
                <div className='notification-content'>
                    <div><b>Username</b> thích bài đăng của bạn</div>
                    <div className='fs-smaller text-secondary'>2 giờ trước</div>
                </div>
            </div>

            <div className='d-flex mb-2'>
                <div className='notification-user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                </div>
                <div className='notification-content'>
                    <div><b>Username</b> thích bài đăng của bạn</div>
                    <div className='fs-smaller text-secondary'>2 giờ trước</div>
                </div>
            </div>

            <div className='d-flex mb-2'>
                <div className='notification-user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                </div>
                <div className='notification-content'>
                    <div><b>Username</b> thích bài đăng của bạn</div>
                    <div className='fs-smaller text-secondary'>2 giờ trước</div>
                </div>
            </div>
        </div>
    );
}

export default NotificationList;
