import React from 'react';

import PostCard from '../postCard/PostCard';
import SideBar from '../layout/SideBar';
import ChatBox from '../message/ChatBox';
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
                <div className='col-md-6'>
                    <div className='mb-3 mx-2'><PostCard/></div>
                    <div className='mb-3 mx-2'><PostCard/></div>
                    <div className='mb-3 mx-2'><PostCard/></div>
                </div>

                <div className='col-md-3'>
                    <ChatBox />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
