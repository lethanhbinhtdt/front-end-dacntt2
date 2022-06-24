import React, { useState, useEffect } from 'react';

import { BASE_URL, POST_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'

import PostCard from '../postCard/PostCard';
import SideBar from '../layout/SideBar';
import ChatBox from '../message/ChatBox';
import FriendRequestBox from '../friend/FriendRequestBox';
import PostBox from '../post/PostBox'
import axios from '../../middlewares/axios';

function HomePage(props) {
    const token = getCookieToken()
    const [postList, setPostList] = useState([])

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

                console.log(dataPost)
                setPostList(dataPost)

            })
    }, [])

    // delete item
    const deletePost = (idPost) => {
        axios.delete(`${POST_URL}/${idPost}`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => {
            // cập nhật lại danh sách
            if (res.status === 200)
                setPostList(oldList => oldList.filter(item => item._id !== idPost));
        })
        .catch(err => {
            console.error(err)
        })
    }

    // var listPost = []
    // const indexId = {}
    // for (let i = 0; i <= postList?.length; i++) {
    //     indexId[i] = postList[i]?._id
    // }
    // for (let i = 0; i <= postList?.length; i++) {
    //     listPost.push(
    //         <div className='mb-3 mx-2'><PostCard indexId={indexId[i]} dataPostInfo={postList[i]} /></div>
    //     )
    // }

    const onCreatePost = (newPost) => {
        // *note: thêm vào đầu danh sách để hiển thị
        setPostList([newPost, ...postList]);
    }

    return (
        <div className='container'>
            {/* Welcome {user.username}!<br /><br /> - Need Login Demo */}
            {/* <input type='button' onClick={handleLogout} value='Logout' /> */}
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-2'>
                    <SideBar />
                </div>
                <div className='col-md-5'>
                    <div className='mb-3'><PostBox onCreatePost={onCreatePost} /></div>
                    {postList && postList.map((item) => (
                        <div className='mb-3 mx-2'><PostCard indexId={item._id} dataPostInfo={item} deletePost={deletePost} /></div>
                    ))}
                    {/* {listPost} */}
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
