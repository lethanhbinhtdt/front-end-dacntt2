import React, { useState, useEffect } from 'react';

import { BASE_URL, POST_URL } from '../../middlewares/constant';
import { getCookieToken, getCookieUser } from '../../middlewares/common'
import InfiniteScroll from 'react-infinite-scroll-component';

import PostCard from '../postCard/PostCard';
import SideBar from '../layout/SideBar';
import ChatBox from '../message/ChatBox';
import FriendRequestBox from '../friend/FriendRequestBox';
import PostBox from '../post/PostBox'
import { Alert } from 'react-bootstrap';

import '../../css/alert.css'

function UserPostList(props) {
    const { numberNoti, setNumberNotiRealTime, userID } = props
    const token = getCookieToken()
    const userInfo = getCookieUser()
    const [postInfo, setPostInfo] = useState()
    const [checkShowMess, setCheckShowMess] = useState(false)
    const [message, setMessage] = useState('')

    const [page, setPage] = useState(1);
    const [hasMorePost, setHasMorePost] = useState(true);

    const fetchDataOnScroll = () => {
        fetch(`${BASE_URL}api/post/${userID}/user/${page}`, {
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
                if (dataPost.length === 0) {
                    setHasMorePost(false);
                } else {
                    setPage(page + 1);
                    setPostInfo([...postInfo, ...dataPost])
                }

            }).catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetch(`${BASE_URL}api/post/${userID}/user`, {
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
            <div className='row mt-3'>
                <div className='col-md-2'></div>
                <div className='col-md-6'>
                    {(userInfo._id == userID) &&
                        <div className='mb-3'><PostBox onCreatePost={onCreatePost} /></div>
                    }
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
                    </InfiniteScroll>


                </div>
                <div className='col-md-4'>
                    <ChatBox />
                    <FriendRequestBox />
                </div>

            </div>
        </div>
    );
}

export default UserPostList;
