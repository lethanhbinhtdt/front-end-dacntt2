import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'

function NotificationList(props) {
    const { noifiInfos, setNoifiInfo } = props
    const [backgroundColor, setBackgrounColor] = useState(noifiInfos?.isChecked ? 'd-flex mb-2' : 'd-flex mb-2 backgroun-noti')
    const [isChangeStatusNoti, setIsChangeStatusNoti] = useState(false)

    const now = new Date();
    var listNoti = []
    // useEffect(()=>{
    //     if(noifiInfos){
    //         setIsChangeStatusNoti(true)
    //     }

    // },[])
    const handleChangeStatus = (e) =>{
        const notiId = e.target.attributes.getNamedItem('notiid').value;
        const token = getCookieToken()
        const data = {
            "notificationId": notiId
        }
        fetch(`${BASE_URL}api/notification/status`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)

        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(notification => {
                
                for(var i =0; i<= noifiInfos?.length;i++){
                    if(noifiInfos[i]?._id == notification?._id){
                        noifiInfos[i] = notification
                        setIsChangeStatusNoti(true)
                    }
                }
            })
            .catch(err => {
                console.error(err)
            })
    }
    // sử dụng useEffect và state isChangeStatusNoti để kiểm tra nếu có thay đổi trong list noti thì tiến hành cập nhật lại mà ko càn fetch lại dữ liệu 
    // vì dữ liệu đã được thay thế ở hàm handleChangeStatus
    useEffect(()=>{
        if(isChangeStatusNoti){
            for (var i = 0; i < noifiInfos?.length; i++) {
                listNoti.push(
                    <>
                        <div key = {noifiInfos[i]?._id} className= {noifiInfos[i]?.isChecked ? 'd-flex mb-2' :'d-flex mb-2 backgroun-noti'}>
                            <div className='notification-user-avatar'>
                                <img alt='user avatar' src={noifiInfos[i]?.userIdGuest.picture}></img>
                            </div>
                            <div className='notification-content'>
                                <div><b>{noifiInfos[i]?.userIdGuest?.fullname}</b> {noifiInfos[i]?.content}</div>
                                <div className='fs-smaller text-secondary'>{now - noifiInfos[i]?.createdAt} giờ trước</div>
                            </div>
                            <div className='notification-button'>
                                {noifiInfos[i]?.isChecked ?  <></>: <div><FontAwesomeIcon  notiid = {noifiInfos[i]?._id} icon={faCheck} color='green' onClick={handleChangeStatus}/></div>}
                                <div><FontAwesomeIcon icon={faX} color='red' /></div>
                            </div>
        
        
                        </div>
                        <hr></hr>
                    </>
                )
            }
            setIsChangeStatusNoti(false)
        }
      
    }, [isChangeStatusNoti])
   
    for (var i = 0; i < noifiInfos?.length; i++) {
        listNoti.push(
            <>
                <div key = {noifiInfos[i]?._id} className= {noifiInfos[i]?.isChecked ? 'd-flex mb-2' :'d-flex mb-2 backgroun-noti'}>
                    <div className='notification-user-avatar'>
                        <img alt='user avatar' src={noifiInfos[i]?.userIdGuest.picture}></img>
                    </div>
                    <div className='notification-content'>
                        <div><b>{noifiInfos[i]?.userIdGuest?.fullname}</b> {noifiInfos[i]?.content}</div>
                        <div className='fs-smaller text-secondary'>{now - noifiInfos[i]?.createdAt} giờ trước</div>
                    </div>
                    <div className='notification-button'>
                        {noifiInfos[i]?.isChecked ?  <></>: <div><FontAwesomeIcon  notiid = {noifiInfos[i]?._id} icon={faCheck} color='green' onClick={handleChangeStatus}/></div>}
                        <div><FontAwesomeIcon icon={faX} color='red' /></div>
                    </div>


                </div>
                <hr></hr>
            </>
        )
    }

    return (
        <div>
            {listNoti}
        </div>
    );
}

export default NotificationList;
