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
    const {deletePost} = props
    const [commentInfo, setCommentInfo] = useState(props?.dataPostInfo?.commentPost)
    const [postInfo, setPostInfo] = useState(props?.dataPostInfo)
    const [numberComment,setNumberComment] = useState(props?.dataPostInfo?.commentPost?.length)

   
    // function ()
    // setState({...state, dataComment:}) // laays duwx lieeuj mowis gawn vao dong comemnt cu se chayj theo state dduwocj 
    // var dataCommentAferLoadMore =""
    const token = getCookieToken()
    const  postId = postInfo?._id

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
                <AuthorPost deletePost={deletePost} dataPostInfo={dataPostInfo} dataAuthorInfo = {dataPostInfo}/>

                {/* Nội dung */}
                <ContentPost dataPostInfo = {dataPostInfo}/>

                {/* like/comment/share */}
                <ReactionPost handleLikePost = {handleLikePost} dataReactionPost = {dataPostInfo}/>

                {/* comments temp đã lấy được và gắn được data nhưng chưa biết vì sao props ko nhân giá trị mới của state*/}

                <Comments onloadmoreComment={onloadmoreComment} dataComment = {commentInfo}/>
            </div>
        </div>
    );
}

export default PostCard;
