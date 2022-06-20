import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
function NotificationList(props) {


    const token = getCookieToken()
    const [notificationInfos, setNotificationInfo] = useState()
    const [lenNotification, setlenNotification] = useState(0)
    useEffect(() => {
        fetch(`${BASE_URL}api/notification/?skip=${lenNotification}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(notification => {
                setNotificationInfo(notification)
                setlenNotification(notification.length)

            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const now = new Date();
    var listNoti = []
    for (var i = 0; i < notificationInfos?.length; i++) {
        listNoti.push(<div className='d-flex mb-2'>
            <div className='notification-user-avatar'>
                <img alt='user avatar' src={notificationInfos[i]?.userIdGuest.picture}></img>
            </div>
            <div className='notification-content'>
                <div><b>{notificationInfos[i]?.userIdGuest?.fullname}</b> {notificationInfos[i]?.content}</div>
                <div className='fs-smaller text-secondary'>{now - notificationInfos[i]?.createdAt} giờ trước</div>
            </div>
        </div>)
    }
    return (
        <div>
            {listNoti}
        </div>
    );
}

export default NotificationList;
