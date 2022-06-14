import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-regular-svg-icons'
import {  } from '@fortawesome/free-solid-svg-icons'


import '../../css/FriendRequestBox.css'

function FriendRequestBox(props) {

    return (
        <div className='friend-request mt-3'>
            <div className='text-secondary'>
                <b>Lời mời kết bạn</b>
            </div>
            
            {/* danh sách lời mời kết bạn */}
            <div className='request-card py-2 mt-2'>
                <div className='d-flex mb-2'>
                    <div className='user-avatar'>
                        <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                    </div>
                    <div>
                        <div><b>Username</b></div>
                        <div className='text-secondary'>2 bạn chung</div>
                    </div>
                </div>

                <div>
                    <button type='button' class='btn btn-primary rounded-pill'>Chấp nhận</button>
                    <button type='button' class='btn btn-refuse rounded-pill'>Xóa</button>
                </div>
            </div>

            {/* 222 */}
            <div className='request-card py-2 mt-2'>
                <div className='d-flex mb-2'>
                    <div className='user-avatar'>
                        <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                    </div>
                    <div>
                        <div><b>Username</b></div>
                        <div className='text-secondary'>2 bạn chung</div>
                    </div>
                </div>

                <div>
                    <button type='button' class='btn btn-primary rounded-pill'>Chấp nhận</button>
                    <button type='button' class='btn btn-refuse rounded-pill'>Xóa</button>
                </div>
            </div>
            {/* End danh sách kết bạn */}
        </div>
    );
}

export default FriendRequestBox;
