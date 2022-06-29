import React, { useState, useEffect } from 'react';

import { BASE_URL, POST_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'

import PostCard from '../postCard/PostCard';
import SideBar from '../layout/SideBar';
import ChatBox from '../message/ChatBox';
import FriendRequestBox from '../friend/FriendRequestBox';
import PostBox from '../post/PostBox'
import { Alert } from 'react-bootstrap';
import '../../css/alert.css'
import axios from '../../middlewares/axios';

function HomePage(props) {
    const { numberNoti, setNumberNotiRealTime } = props
    const token = getCookieToken()
    const [postInfo, setPostInfo] = useState()
    const [checkShowMess, setCheckShowMess] = useState(false)
    const [message, setMessage] = useState('')


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
            }).then(dataPost => {
                setPostInfo(dataPost)

            }).catch(err => {
                console.error(err)
            })
    }, [])

    const onDeletePost = (idPost) => {
        setPostInfo(oldList => oldList.filter(item => item._id !== idPost));
    }

    const onCreatePost = (newPost) => {
        // *note: thêm vào đầu danh sách để hiển thị
        setPostInfo([newPost, ...postInfo]);
    }

    const onUpdatePost = (newPost) => {
        const newItems = postInfo.map(post => {
            if (newPost._id == post._id) {
                return { ...post, content: newPost.content, image: newPost.image, video: newPost.video };
            }
            return post;
        });
        setPostInfo(newItems);
    }

    useEffect(() => {
        if (checkShowMess) {
            setTimeout(() => {
                setCheckShowMess(false);
            }, 3000);
        }

    }, [checkShowMess]);

    return (
        <div className='container'>
            {/* Welcome {user.username}!<br /><br /> - Need Login Demo */}
            {/* <input type='button' onClick={handleLogout} value='Logout' /> */}
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-2'>
                    <SideBar numberNotification={numberNoti} />
                    <div className='notification'><Alert className='fade-out-noti' show={checkShowMess} variant='primary'>{message}</Alert></div>
                </div>
                <div className='col-md-5'>
                    <div className='mb-3'><PostBox onCreatePost={onCreatePost} /></div>
                    {postInfo && postInfo.map((item) => (
                        <div className='mb-3 mx-2'>
                            <PostCard 
                                indexId={item._id}
                                dataPostInfo={item}
                                onDeletePost={onDeletePost}
                                onUpdatePost={onUpdatePost}
                            />
                        </div>
                    ))}
                </div>
                <div className='col-md-4'>
                    <ChatBox />
                    <FriendRequestBox />
                </div>

            </div>
        </div>
    );
}

export default HomePage;
