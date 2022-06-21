import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'

function NotificationList(props) {
    const {noifiInfos} = props
    const now = new Date();
    var listNoti = []
    for (var i = 0; i < noifiInfos?.length; i++) {
        listNoti.push(<div className='d-flex mb-2'>
            <div className='notification-user-avatar'>
                <img alt='user avatar' src={noifiInfos[i]?.userIdGuest.picture}></img>
            </div>
            <div className='notification-content'>
                <div><b>{noifiInfos[i]?.userIdGuest?.fullname}</b> {noifiInfos[i]?.content}</div>
                <div className='fs-smaller text-secondary'>{now - noifiInfos[i]?.createdAt} giờ trước</div>
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
