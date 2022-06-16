import React, { useEffect, useState } from 'react';

function NotificationList(props) {
    var { notificationInfo } = props
    const [notificationInfos, setnotificationInfo] = useState(notificationInfo)
    useEffect(()=>{
        setnotificationInfo(notificationInfo)
    },[notificationInfo])
    console.log(",notificationInfos",notificationInfos)
    const now = new Date();
    return (
        <div>
            {notificationInfos?.map((notificationInfo) => {
                <div className='d-flex mb-2'>
                    <div className='notification-user-avatar'>
                        <img alt='user avatar' src={notificationInfo?.userIdGuest?.picture}></img>
                    </div>
                    <div className='notification-content'>
                        <div><b>{notificationInfo?.userIdGuest?.fullname}</b> thích bài đăng của bạn</div>
                        <div className='fs-smaller text-secondary'>{now - notificationInfo.createdAt} giờ trước</div>
                    </div>
                </div>
            })}
            {/* <div className='d-flex mb-2'>
                <div className='notification-user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                </div>
                <div className='notification-content'>
                    <div><b>Username</b> thích bài đăng của bạn</div>
                    <div className='fs-smaller text-secondary'></div>
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
            </div> */}
        </div>
    );
}

export default NotificationList;
