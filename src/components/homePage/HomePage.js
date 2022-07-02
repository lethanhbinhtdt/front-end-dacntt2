import React, { useState, useEffect, useContext } from 'react';

import { BASE_URL, POST_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import InfiniteScroll from 'react-infinite-scroll-component';

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
    const [checkHaveNewComment, setCheckHaveNewComment] = useState(false)
    const [newCommentRealTime, setNewCommentRealtime] = useState(false)
    const socket = useContext(SocketContext);
    
    const [page, setPage] = useState(1);
    const [hasMorePost, setHasMorePost] = useState(true);

    const fetchDataOnScroll = () => {
        fetch(`${BASE_URL}api/post/${page}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // body: JSON.stringify(page)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(dataPost => {
                if(dataPost.length===0){
                    setHasMorePost(false);
                } else {
                    setPage(page+1);
                    setPostInfo([...postInfo, ...dataPost])
                }
            }).catch(err => {
                console.error(err)
            })
    }
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
            setCheckHaveNewComment(true)
            setNewCommentRealtime(data)
            // for(var i = 0 ; i< postInfo?.length; i++){
            //     if(postInfo[i]?._id.toString() === data.postId){
            //         console.log( "beforre",  postInfo[i]?.dataComment)
            //         postInfo[i] = postInfo[i].toJSON()
            //         postInfo[i].dataComment = [...[data],...postInfo[i]?.dataComment]
            //     }
            //     break
            // }


        })
    }, [socket, numberNotiRealTime]);

    useEffect(() => {
        // console.log("beforre", postInfo, newCommentRealTime)
        if(checkHaveNewComment){
            for (var i = 0; i < postInfo?.length; i++) {
                console.log("beforre", postInfo[i]?.commentPost, postInfo[i]?._id)
                if (postInfo[i]?._id === newCommentRealTime?.postId) {
                    console.log("asdfsdf", postInfo[i]?.commentPost)
                    postInfo[i].commentPost = [...[newCommentRealTime], ...postInfo[i]?.commentPost]
                    console.log("after", postInfo[i]?.commentPost)
                    setPostInfo(postInfo)
                    break
                }
            }
        }
      

    }, [checkHaveNewComment])

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
            <div className='mb-3 mx-2'><PostCard setMess={setMessage} setCheckShowMessage={setCheckShowMess} dataPostInfo={postInfo[i]} onDeletePost={onDeletePost} onUpdatePost={onUpdatePost} checkHaveNewComment={checkHaveNewComment} setCheckHaveNewComment = {setCheckHaveNewComment}/></div>
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
                    
                    <InfiniteScroll
                        dataLength={postInfo?.length || 0} //This is important field to render the next data
                        next={fetchDataOnScroll}
                        hasMore={hasMorePost}
                        loader={<p className='text-info'>Đang tải...</p>}
                        endMessage={
                            <p className='text-center text-info'>
                              <b>...Hết bài viết...</b>
                            </p>
                        }
                    >
                         {listPost}
                    </InfiniteScroll>


                    {/* {postInfo && postInfo.map((item) => (
             
                        <div className='mb-3 mx-2'><PostCard setMess={setMessage} setCheckShowMessage={setCheckShowMess} indexId={item._id} dataPostInfo={item} deletePost={deletePost} /></div>
                    ))} */}
                  
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
