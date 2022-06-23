import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-solid-svg-icons'

import FriendRequestList from './FriendRequestList';
import '../../css/findFriend.css'
import { Button } from 'react-bootstrap';
import { BASE_URL } from '../../middlewares/constant';
import {getCookieToken} from '../../middlewares/common'

function FindFriend(props) {
    const [user, setUser] = useState()
    const token = getCookieToken()
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    useEffect(()=>{
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
        }).then(dataUser=>{
            console.log(dataUser)
            setUser(dataUser)

        })
        .catch(err=>{
            console.error(err)
        })
    },[])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>aa</div>
                <div className='col-md-6'>
                    
                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="..." class="card-img" alt="..."></img>
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-i</p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <Button className='position-absolute top-50 end-0 translate-middle-y'>thêm bạn</Button>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='col-md-3'>cc</div>
            </div>
        </div>

    );
}

export default FindFriend;