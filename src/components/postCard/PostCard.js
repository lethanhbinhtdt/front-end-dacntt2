import React, { useState, useEffect } from 'react';

import AuthorPost from './AuthorPost';
import ContentPost from './ContentPost';
import ReactionPost from './ReactionPost';
import Comments from './Comments';
import PostModal from '../post/PostModal';

import axios from '../../middlewares/axios';
import { BASE_URL, POST_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'

import '../../css/PostCard.css';

function PostCard(props) {
    const { onDeletePost, onUpdatePost } = props
    var { setCheckMess, setMess, dataPostInfo } = props
    const [commentInfo, setCommentInfo] = useState(props?.dataPostInfo?.commentPost)
    const [numberComment, setNumberComment] = useState(props?.dataPostInfo?.commentPost?.length)
    const [isLiked, setIsLike] = useState(dataPostInfo ? dataPostInfo.isLikePost : false);
    const [totolLike, setTotolLike] = useState(dataPostInfo?.likedBy.length)
    const [postId, setPostId] = useState(props?.dataPostInfo?._id)
    const [userIdOfPost, setUserIdOfPost] = useState(dataPostInfo?.createdBy?._id)
    const [checkDeleteComment, setCheckDeleteComment] = useState(numberComment)

    const [openModal, setOpenModal] = useState(false);
    // function ()
    // setState({...state, dataComment:}) // laays duwx lieeuj mowis gawn vao dong comemnt cu se chayj theo state dduwocj 
    // var dataCommentAferLoadMore =""
    const token = getCookieToken()
    // const  postId = postInfo?._id
    const handleLikePost = () => {
        fetch(`${BASE_URL}api/post/${postId}/like`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(infoLike => {
                setIsLike(infoLike?.status)
                setTotolLike(infoLike?.length)
            })
    }

    const onloadmoreComment = () => {
        // const [postInfo, setPostInfo] = useState()
        // console.log(postId, "+ ", numberComment)
        fetch(`${BASE_URL}api/post/${postId}/comment/?skip=${numberComment}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                setNumberComment(numberComment + data?.length)
                setCommentInfo([...commentInfo, ...data])

            })
            .catch(e => {
                console.error(e)
            })
    }

    const onLoadAfterDeleteComment = () => {
        fetch(`${BASE_URL}api/post/${postId}/comment/?limit=${numberComment}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                setNumberComment(data.length)
                setCommentInfo(data)

            })
            .catch(e => {
                console.error(e)
            })
    }

    // share post 
    const handleSharePost = () => {
        fetch(`${BASE_URL}api/post/${postId}/share`, {
            method: 'POST',
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
                setCheckMess(true)
                setMess(dataPost['description'])

            })
            .catch(err => {
                console.error(err)
            })
    }

    const deletePost = (idPost) => {
        axios.delete(`${POST_URL}/${idPost}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                // cập nhật lại danh sách
                if (res.status === 200)
                    onDeletePost(idPost)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (

        <div>
            <div className='post-card'>
                {/* Người đăng */}
                <AuthorPost 
                    deletePost={deletePost} 
                    dataPostInfo={dataPostInfo} 
                    dataAuthorInfo={dataPostInfo} 
                    setOpenModal={setOpenModal}/>

                {/* Nội dung */}
                <ContentPost dataPostInfo={dataPostInfo} />

                {/* like/comment/share */}
                <ReactionPost handleSharePost={handleSharePost} handleLikePost={handleLikePost} isLiked={isLiked} totolLike={totolLike} />

                {/* comments temp đã lấy được và gắn được data nhưng chưa biết vì sao props ko nhân giá trị mới của state*/}
                <Comments onLoadAfterDeleteComment={onLoadAfterDeleteComment} onloadmoreComment={onloadmoreComment} dataComment={commentInfo} postId={postId} userId={userIdOfPost} />
            
                {/* modal update post */}
                <PostModal
                    oldPost = {dataPostInfo}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    onUpdatePost={onUpdatePost}/>
            </div>
        </div>
    );
}

export default PostCard;
