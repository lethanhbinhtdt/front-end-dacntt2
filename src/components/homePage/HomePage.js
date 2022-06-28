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
    const {numberNoti, messageRealtime, setDataMess} = props
    const token = getCookieToken()
    const [postInfo, setPostInfo] = useState()
    const [checkShowMess, setCheckShowMess] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(()=>{
        console.log("da vao111111111111111111111111")
        if(messageRealtime){
            setMessage(messageRealtime)
            setCheckShowMess(true)
        }

    },[messageRealtime])
    
    console.log("message",message)
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

        }).catch(err=>{
            console.error(err)
        })
    },[])
    // var listPost = []
        // const indexId = {}
        // for (let i = 0; i <= postInfo?.length; i++) {
        //     indexId[i] = postInfo[i]?._id
        // }
        // for (let i = 0; i <= postInfo?.length; i++) {
        //     listPost.push(
        //         <div className='mb-3 mx-2'><PostCard indexId={indexId[i]} dataPostInfo={postInfo[i]} /></div>
        //     )
        // }
    // delete item
    const deletePost = (idPost) => {
        axios.delete(`${POST_URL}/${idPost}`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => {
            // cập nhật lại danh sách
            if (res.status === 200)
                setPostInfo(oldList => oldList.filter(item => item._id !== idPost));
        })
        .catch(err => {
            console.error(err)
        })
    }

    const onCreatePost = (newPost) => {
        // *note: thêm vào đầu danh sách để hiển thị
        setPostInfo([newPost, ...postInfo]);
    }

    // cách thực hiện realtime cho like share comment
    // bên App sử dụng state setSocketData và socketData để truyền message bên backend gửi lên 
    // sau đó truyền cả 2 biến qua cho child 
    // dùng useEffect để nhận nếu  socketData có thay đổi thì set mess bằng gái trị mới đồng thời set lại trạng thái là có thông báo là true để hiển thị alert 
    // sau khi hiển thị alert xong thì set lại có thông báo là fall và datamess là '' để có thể khi có dữ liệu mới sẽ nhận thấy sự thay đổi mà vào useEffect 
    useEffect(() => {
        console.log("cos thay doi ")
        if(checkShowMess){
            setTimeout(() => {
                setCheckShowMess(false);
            }, 3000);
        }
        setDataMess('')
      }, [checkShowMess]);     
        
    console.log('numberNoti', numberNoti)
    return (
        <div className='container'>
            {/* Welcome {user.username}!<br /><br /> - Need Login Demo */}
            {/* <input type='button' onClick={handleLogout} value='Logout' /> */}
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-2'>
                
                    <SideBar numberNotification = {numberNoti}/>
                    <div className='notification'><Alert  show={checkShowMess} variant='primary'>{message}</Alert></div>
                </div>
                <div className='col-md-5'>
                    <div className='mb-3'><PostBox onCreatePost={onCreatePost} /></div>
                    {postInfo && postInfo.map((item) => (
                        <div className='mb-3 mx-2'><PostCard setMess = {setMessage} setCheckShowMessage = {setCheckShowMess} indexId={item._id} dataPostInfo={item} deletePost={deletePost} /></div>
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
