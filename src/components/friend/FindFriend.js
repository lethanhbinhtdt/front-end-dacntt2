import React, { useEffect, useState } from 'react';
import { useLocation, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-solid-svg-icons'
import FriendRequestList from './FriendRequestList';
import '../../css/findFriend.css'
import { Button } from 'react-bootstrap';
import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'

function FindFriend(props) {
    const [users, setUser] = useState()
    const { state } = useLocation();
    const token = getCookieToken()
    const search = useLocation().search;
    const [isChangeTypeAfterClickRequestFriend, setisChangeTypeAfterClickRequestFriend] = useState(false)
    const currentUserId = state["currentUserId"]
    console.log("currentUserId", currentUserId)
    const name = new URLSearchParams(search).get('name');
    useEffect(() => {
        fetch(`${BASE_URL}api/account/${name}`, {
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
            }).then(dataUser => {
                setUser(dataUser)
                setisChangeTypeAfterClickRequestFriend(false)

            })
            .catch(err => {
                console.error(err)
            })
    }, [isChangeTypeAfterClickRequestFriend])


    function SendFriendRequest(e) {
        console.log(e.target)
        var idUserWantoSendRequest = e.target.attributes.getNamedItem('iduser').value;

        fetch(`${BASE_URL}api/requestFriend/${idUserWantoSendRequest}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {

                if (res.ok) {
                    console.log("da ket bạn thanh công")
                    return res.json()
                }
            })
            .then(textOfButton => {
                setisChangeTypeAfterClickRequestFriend(true)
            })
            .catch(err => {
                console.error(err)
            })
    }
    const onAcceptRequest = (e) =>{
        var idUserInQueue = e.target.attributes.getNamedItem('iduser').value;
        fetch(`${BASE_URL}api/requestFriend/reply/${idUserInQueue}`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

    )
    .then((res) => {
        if (res.ok) {
            setisChangeTypeAfterClickRequestFriend(true)
        }
    })
    .catch(err => {
        console.error(err)
    })
    }
    const listUserFind = []
    var buttonType = ''
    for (var i = 0; i < users?.length; i++) {
        console.log(users[i])
        if (users[i]._id === currentUserId) {
            continue
        }
        if(users[i].friendStatus===true){
            buttonType = <Button disabled variant='success' className='position-absolute top-50 end-0 translate-middle-y'>Bạn bè</Button>
        }
        else if (users[i].friendStatus === false){
            buttonType = <Button disabled variant='light' className='position-absolute top-50 end-0 translate-middle-y'>Đã gửi lời mời</Button>

        }
        else if(users[i].friendStatus == null){
            buttonType = <Button className='position-absolute top-50 end-0 translate-middle-y' iduser={users[i]._id} onClick={SendFriendRequest}>Kết bạn</Button>

        }
        else if(users[i].friendStatus == 'other'){
            buttonType = <Button className='position-absolute top-50 end-0 translate-middle-y' iduser={users[i]._id} onClick={onAcceptRequest}>Xác nhận</Button>

        }
        listUserFind.push(
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={users[i]?.picture} className="card-img" alt="..."></img>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <h5 className="card-text"><Link to= {`/personal/${users[i]?._id}/post/`} state={{"id": users[i]?._id}}>{users[i]?.fullname}</Link></h5>
                        </div>
                    </div>
                    <div className="col-md-2">
                        {buttonType}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>

                    {listUserFind}

                </div>
                <div className='col-md-3'></div>
            </div>
        </div>

    );
}

export default FindFriend;