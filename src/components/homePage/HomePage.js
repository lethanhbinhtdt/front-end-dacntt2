import React from 'react';

import PostCard from '../postCard/PostCard';
import SideBar from '../layout/SideBar';
import ChatBox from '../message/ChatBox';
import FriendRequestBox from '../friend/FriendRequestBox';
import PostBox from '../post/PostBox';
function HomePage(props) {

    return (
        <div>
            {/* Welcome {user.username}!<br /><br /> - Need Login Demo */}
            {/* <input type='button' onClick={handleLogout} value='Logout' /> */}
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-2'>
                    <SideBar/>
                </div>
                <div className='col-md-5'>
                    {/* Đăng bài mới */}
                    
                    <div className='mb-3'><PostBox /></div>


                    {/* hiển thị các bài đăng */}
                    <div className='mb-3'><PostCard/></div>
                    <div className='mb-3'><PostCard/></div>
                    <div className='mb-3'><PostCard/></div>
                </div>

                <div className='col-md-3'>
                    <ChatBox />
                    <FriendRequestBox />
                </div>
                
                <div className='col-md-1'></div>
            </div>
        </div>
    );
}

export default HomePage;
