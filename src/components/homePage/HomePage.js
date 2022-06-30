import React, { useState, useEffect, useContext } from 'react';

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
import { SocketContext } from '../../middlewares/socket';

function HomePage(props) {
    // const {numberNoti, messageRealtime, setDataMess} = props
    const token = getCookieToken()
    const [postInfo, setPostInfo] = useState()
    const [checkShowMess, setCheckShowMess] = useState(false)
    const [numberNotiRealTime, setNumberNotiRealTime] = useState(0)
    const [message, setMessage] = useState('')
    const socket = useContext(SocketContext);

    useEffect(() => {

        socket.on("receiveMessageNoti", (data) => {
            console.log(data)
            setMessage(data)
            setCheckShowMess(true)
            setNumberNotiRealTime(numberNotiRealTime + 1)
    
        });

        socket.on('receiveMessageLike', data => {
            console.log(data)
            setMessage(data)
            setCheckShowMess(true)
            setNumberNotiRealTime(numberNotiRealTime + 1)

        })

        socket.on('receiveMessageShare', data => {
            console.log(data)
            setMessage(data)
            setCheckShowMess(true)
            setNumberNotiRealTime(numberNotiRealTime + 1)

        })
        socket.on('receiveCommentInfo', data => {
            console.log("ádfasfasfasfasdfasdf", data)
            // setMessage(data)
            // setCheckShowMess(true)
            // setNumberNotiRealTime(numberNotiRealTime + 1)

        })

    }, [socket, numberNotiRealTime]);

    // useEffect(() => {
    //     if (message) {
    //         setMessage(message)
    //         setCheckShowMess(true)
    //     }

    // }, [message])

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

    // delete item
    const deletePost = (idPost) => {
        axios.delete(`${POST_URL}/${idPost}`, {
            headers: { 'Authorization': `Bearer ${token}` }
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
    //  bên backend gửi lên message sẽ được lưu vào biến message đồng thời set lai giá trị của checkshow mesage để hiển thị được alert 
    // biến message dùng chung vs message thông báo như share bài thành công xóa bài thành công vv 
    useEffect(() => {
        if (checkShowMess) {
            setTimeout(() => {
                setCheckShowMess(false);
            }, 3000);
        }
    }, [checkShowMess]);
    var listPost = []
    for (let i = 0; i <= postInfo?.length; i++) {
        socket.emit('joinRoom', postInfo[i]?._id)
        listPost.push(
            // <div className='mb-3 mx-2'><PostCard dataPostInfo={postInfo[i]} /></div>
            <div className='mb-3 mx-2'><PostCard setMess={setMessage} setCheckShowMessage={setCheckShowMess} dataPostInfo={postInfo[i]} deletePost={deletePost} /></div>
        )
    }
    return (
        <div className='container'>
            {/* Welcome {user.username}!<br /><br /> - Need Login Demo */}
            {/* <input type='button' onClick={handleLogout} value='Logout' /> */}
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-2'>

                    <SideBar numberNotification={numberNotiRealTime} />
                    <div className='notification'><Alert show={checkShowMess} variant='primary'>{message}</Alert></div>
                </div>
                <div className='col-md-5'>
                    <div className='mb-3'><PostBox onCreatePost={onCreatePost} /></div>
                    {/* {postInfo && postInfo.map((item) => (
             
                        <div className='mb-3 mx-2'><PostCard setMess={setMessage} setCheckShowMessage={setCheckShowMess} indexId={item._id} dataPostInfo={item} deletePost={deletePost} /></div>
                    ))} */}
                    {listPost}
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
