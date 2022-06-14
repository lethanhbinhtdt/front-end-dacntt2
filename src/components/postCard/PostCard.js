import React from 'react';

import AuthorPost from './AuthorPost';
import ContentPost from './ContentPost';
import ReactionPost from './ReactionPost';
import Comments from './Comments';
import { useState, useEffect } from 'react'
import { BASE_URL } from '../../middlewares/constant';
import {getCookieToken} from '../../middlewares/common'
import '../../css/PostCard.css';

function PostCard(props) {
    var dataPostInfo = props.dataPostInfo
    const [commentInfo, setCommentInfo] = useState(props?.dataPostInfo?.commentPost)
    const [postInfo, setPostInfo] = useState(props?.dataPostInfo)
    const [numberComment,setNumberComment] = useState(props?.dataPostInfo?.commentPost?.length)
    const [isLiked, setIsLike] = useState(dataPostInfo? dataPostInfo.isLikePost:false);
    const [totolLike, setTotolLike] = useState(dataPostInfo?.likedBy.length)

   
    // function ()
    // setState({...state, dataComment:}) // laays duwx lieeuj mowis gawn vao dong comemnt cu se chayj theo state dduwocj 
    // var dataCommentAferLoadMore =""
    const token = getCookieToken()
    const  postId = postInfo?._id
    console.log("is like ost ", isLiked)
    const handleLikePost = () =>{
        console.log("da vao function like")
        fetch(`${BASE_URL}api/post/${postId}/like`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
        .then(res=>{
            if(res.ok){
                return res.json()
            }
        })
        .then(infoLike=>{
            console.log("infoLike",infoLike)
            setIsLike(infoLike?.status)
            setTotolLike(infoLike?.length)
        })
    }
    
    const onloadmoreComment = () => {


        // const [postInfo, setPostInfo] = useState()
        console.log(postId, "+ ", numberComment)
        fetch(`${BASE_URL}api/post/${postId}/comment/?start=${numberComment}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }
        })
        .then(data =>{

            setNumberComment(numberComment + data?.length)
            setCommentInfo([...commentInfo,...data])
            
        })
        .catch(e=>{
            console.error(e)
        })
    }
    console.log("commentinfo", commentInfo)

    // useEffect(()=>{
    //     a.push(<div className='post-card'><AuthorPost dataAuthorInfo = {dataPostInfo}/><ContentPost dataPostInfo = {dataPostInfo}/><ReactionPost dataReactionPost = {dataPostInfo}/>{numberComment}<Comments onloadmoreComment={onloadmoreComment} dataComment = {commentInfo}/></div>)
    // })
    return (

        <div>

            <div className='post-card'>
                {/* Người đăng */}
                <AuthorPost dataAuthorInfo = {dataPostInfo}/>

                {/* Nội dung */}
                <ContentPost dataPostInfo = {dataPostInfo}/>

                {/* like/comment/share */}
                <ReactionPost handleLikePost = {handleLikePost} isLiked = {isLiked} totolLike={totolLike} />

                {/* comments temp đã lấy được và gắn được data nhưng chưa biết vì sao props ko nhân giá trị mới của state*/}

                <Comments onloadmoreComment={onloadmoreComment} dataComment = {commentInfo}/>
            </div>
        </div>
    );
}

export default PostCard;
