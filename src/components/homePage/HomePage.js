import React from 'react';

import PostCard from '../postCard/PostCard';
import SideBar from '../layout/SideBar';
import ChatBox from '../message/ChatBox';
import { useState, useEffect } from 'react'
import { BASE_URL } from '../../middlewares/constant';
import {getCookieToken} from '../../middlewares/common'
import FriendRequestBox from '../friend/FriendRequestBox';
import PostBox from '../post/PostBox'
function HomePage(props) {
    const token = getCookieToken()
    const [postInfo, setPostInfo] = useState()
    const [notificationInfo, setNotificationInfo] = useState()
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
        }).then(notification=>{
            setNotificationInfo(notification)

        })
    }, [])
    useEffect(() => {
        fetch(`${BASE_URL}api/post`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // body: JSON.stringify(yourNewData)
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(dataPost=>{
            setPostInfo(dataPost)

        })
        .catch(err=>{
            console.error(err)
        })
    },[])
    var listPost = []
    const indexId = {}
    for(var i =0 ;i<=postInfo?.length;i++){
        indexId[i] = postInfo[i]?._id
    }
    for(var i =0 ;i<=postInfo?.length;i++){
 
        listPost.push(       
        <div className='mb-3 mx-2'><PostCard indexId= {indexId} dataPostInfo = {postInfo[i]}/></div>
  )
    }
    return (
        <div className = 'container'>
            {/* Welcome {user.username}!<br /><br /> - Need Login Demo */}
            {/* <input type='button' onClick={handleLogout} value='Logout' /> */}
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-2'>
                    <SideBar notificationInfo = {notificationInfo}/>
                </div>
                <div className='col-md-5'>
                <div className='mb-3'><PostBox /></div>
                {listPost}
                </div>
                <div className='col-md-4'>
                    <ChatBox />
                    <FriendRequestBox/>
                </div>
                
            </div>
        </div>
    );
}

export default HomePage;
