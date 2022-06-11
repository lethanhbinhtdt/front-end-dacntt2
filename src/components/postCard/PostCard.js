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
    const [state,setState] = useState(dataPostInfo)
   
    function ()
    setState({...state, dataComment:}) // laays duwx lieeuj mowis gawn vao dong comemnt cu se chayj theo state dduwocj 
    // const token = getCookieToken()
    // const [postInfo, setPostInfo] = useState()
    // useEffect(() => {
    //     fetch(`${BASE_URL}api/post`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //         // body: JSON.stringify(yourNewData)
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         }
    //     }).then(dataPost=>{
    //         console.log(dataPost)
    //         setPostInfo(dataPost)

    //     })
    // },[])
    return (
        <div>
            <div className='post-card'>
                {/* Người đăng */}
                <AuthorPost dataAuthorInfo = {dataPostInfo??"o"}/>

                {/* Nội dung */}
                <ContentPost dataPostInfo = {dataPostInfo}/>

                {/* like/comment/share */}
                <ReactionPost dataReactionPost = {dataPostInfo}/>
                {/* comments temp */}
                <Comments onloadmore={()=>{}} dataComment = {dataPostInfo}/>
            </div>
        </div>
    );
}

export default PostCard;
