import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import InfiniteScroll from 'react-infinite-scroll-component';

function NotificationList(props) {
    const { setNumberNotiNotChecked } = props
    const now = new Date();
    const token = getCookieToken()

    const [notificationInfos, setNotificationInfo] = useState()
    const [hasMorePost, setHasMorePost] = useState(true);

    useEffect(() => {
        fetch(`${BASE_URL}api/notification`, {
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
                var numberNotCheck = 0
                for (var i = 0; i <= notification?.length; i++) {
                    if (!notification[i]?.isChecked) {
                        numberNotCheck = numberNotCheck + 1
                    }
                }
                setNumberNotiNotChecked(numberNotCheck)

            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const fetchMoreData = () => {
        fetch(`${BASE_URL}api/notification/?skip=${notificationInfos.length}`, {
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
                if (notification.length == 0) {
                    setHasMorePost(false);
                    return;
                }

                setNotificationInfo([...notificationInfos, ...notification])
                var numberNotCheck = 0
                for (var i = 0; i <= notification?.length; i++) {
                    if (!notification[i]?.isChecked) {
                        numberNotCheck = numberNotCheck + 1
                    }
                }
                setNumberNotiNotChecked(numberNotCheck)

            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div
            id='scrollableDiv'
            className='menu-popup notifications-popup'
        >
            {/*Put the scroll bar always on the bottom*/}
            <InfiniteScroll
                dataLength={notificationInfos?.length || 0}
                next={fetchMoreData}
                hasMore={hasMorePost}
                loader={<p className='text-info'>Đang tải thông báo...</p>}
                scrollableTarget='scrollableDiv'
            >

                {notificationInfos && notificationInfos.map((item) => (
                    <div className='d-flex mb-2'>
                        <div className='notification-user-avatar'>
                            <img alt='user avatar' src={item?.userIdGuest.picture}></img>
                        </div>
                        <div className='notification-content'>
                            <div><b>{item?.userIdGuest?.fullname}</b> {item?.content}</div>
                            <div className='fs-smaller text-secondary'>{now - item?.createdAt} giờ trước</div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default NotificationList;
