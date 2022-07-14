import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-solid-svg-icons'

import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import '../../css/FriendRequestBox.css'

function FriendRequestBox(props) {
    const [friendRequest, setFriendRequest] = useState(null)
    const [message, setMessage] = useState()
    const token = getCookieToken()
    useEffect(() => {

        fetch(`${BASE_URL}api/requestFriend/`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }

            }

        )
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                setFriendRequest(data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const onAcceptRequest = (e) => {
        var idUserInQueue = e.target.attributes.getNamedItem('iduser')?.value;
        fetch(`${BASE_URL}api/requestFriend/reply/${idUserInQueue}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"start":friendRequest?.length})
            }

        )
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                setFriendRequest(data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const onDeleteRequest = (e) => {
        var idUserInQueue = e.target.attributes.getNamedItem('iduser').value;
        fetch(`${BASE_URL}api/requestFriend/deny/${idUserInQueue}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(mess => {
                setMessage(mess)
            })
            .catch(err => {
                console.error(err)
            })
    }
    var friendRequestBox = []
    if (friendRequest?.length!==0) {
        for(var i =0;i<friendRequest?.length;i++){


            friendRequestBox.push(
                <div key={friendRequest[i]?._id} className='request-card py-2 mt-2' >
                 {/* <div  className='request-card py-2 mt-2' > */}
                    <div className='d-flex mb-2'>
                        <div className='user-avatar'>
                            <img alt='user avatar' src={friendRequest[i]?.userRequest?.picture}></img>
                        </div>
                        <div>
                            <div><b>{friendRequest[i]?.userRequest?.fullname}</b></div>
                            {/* <div className='text-secondary'>2 bạn chung</div> */}
                        </div>
                    </div>

                    <div>
                        <button iduser={friendRequest[i]?.userRequest?._id} type='button' className='btn btn-primary rounded-pill' onClick={onAcceptRequest}>Chấp nhận</button>
                        <button iduser={friendRequest[i]?.userRequest?._id} type='button' className='btn btn-refuse rounded-pill' onClick={onDeleteRequest}>Xóa</button>
                    </div>
                </div>
            )
        }
    }
    else {
        friendRequestBox.push(

            <div className='request-card py-2 mt-2'>
                <div className='d-flex mb-2'>
                    <div>
                        <div><b>Chưa có lời mời kết bạn nào</b></div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='friend-request mt-3'>
            <div className='text-secondary'>
                <b>Lời mời kết bạn</b>
            </div>
            {friendRequestBox}
         
        </div>
    );
}

export default FriendRequestBox;
