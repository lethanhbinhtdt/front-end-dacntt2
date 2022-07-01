import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faComment } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import {NUMBER_NEXT_LOAD} from '../../middlewares/constant'
import { SocketContext } from '../../middlewares/socket';

function Comments(props) {
    const {onloadmoreComment, dataComment, postId, userId, onLoadAfterDeleteComment} = props
    const [postIdState, setPostId] = useState(postId)
    const [datacommentState, setDataComment] = useState(dataComment? dataComment: " ")
    const [textLoadMoreCommentOrNot, SetTextLoadMoreCommentOrNot] = useState("Xem thêm 5 bình luận khác")

    // const [postInfo, setPostInfo] = useState(props ? props.dataComment : "");
    const [commentText, setCommentText] = useState("")
    const [userIdOfPost, setUserIdOfPost]  = useState(userId)
    const socket = useContext(SocketContext);

    useEffect(() => {
        // if(datacommentState?.length !== dataComment?.length){
        //     setDataComment(dataComment)
        // }
        // check thêm nếu đã hết comment thiof ko hiển thị chữ nữa
        // if(dataComment?.length == datacommentState.length){
        //     SetTextLoadMoreCommentOrNot('')
        // }
         
        console.log("da at comment ", dataComment)
        setDataComment(dataComment)
    },  [ dataComment ])


    const handleInputChange = (e)=>{
        setCommentText(e.target.value)
    }
    var listComment = []
    var token = getCookieToken()

    const createNewComment = (e) =>{
        // var userIdPost = e.target.attributes.getNamedItem('userid')?.value;
        // console.log("socket 123123123123", userIdPost)
        // socket.emit("createNewNoti", userIdPost);
        fetch(`${BASE_URL}api/post/${postIdState}/comment/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':true


            },
            body: JSON.stringify({ "content":commentText})
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }
        })
        .then(newComment=>{
            setCommentText("")
            setDataComment([...[newComment],...datacommentState])
        })
        .catch(err=>{
            console.error(err)
        })
    }

    const deleteComment = (e) =>{
        var commentId =  e.target.attributes.getNamedItem('commentid')?.value;
        fetch(`${BASE_URL}api/post/${postIdState}/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res)=>{
            if(res.ok){
                onLoadAfterDeleteComment()
            }
        })
        .catch(err=>{
            console.error(err)
        })
    }
    for (var i = datacommentState?.length - 1; i >=0 ; i--) {
        listComment.push(
            <div  className='mb-3 d-flex d-row'>
            {/* <div className='mb-3 d-flex d-row'> */}
                <img className='comment-img' src={datacommentState[i]?.createdBy?.picture} alt='Avatar user'></img>
                <div className='flex-column comment-content'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Link to={`/personal/${datacommentState[i]?.createdBy?._id}/post/`} state={{ "id": datacommentState[i]?.createdBy?._id }} className='text-dark text-decoration-none'><b>{datacommentState[i]?.createdBy?.fullname}</b></Link>
                            <div className='text-secondary fs-smaller'>
                                {datacommentState[i]?.createdAt}
                            </div>
                        </div>

                        {/* sửa/xóa */}
                        <Dropdown>
                            <Dropdown.Toggle className='ms-2 rounded-pill py-0 bg-my-color border-0 text-dark'>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item  commentid ={datacommentState[i]?._id}>Sửa</Dropdown.Item>
                                <Dropdown.Item commentid ={datacommentState[i]?._id} onClick={deleteComment}>Xóa</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='text-justify'>
                        {datacommentState[i]?.content}
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>

            <hr></hr>
            <form className='d-flex comment-send px-1 mb-2'>
                <FontAwesomeIcon icon={faComment} className='mx-2 my-auto' />
                <input  onChange={handleInputChange} type='text' className='comment-input py-2 pe-3' placeholder='Bình luận...' value = {commentText}></input>
                <button type="button" className="btn"><FontAwesomeIcon icon={faPaperPlane}  userid = {userIdOfPost} className='my-auto' onClick={createNewComment}/></button>
            </form>
            {listComment}
            <div   className='text-link text-secondary fs-smaller' onClick={onloadmoreComment}>{textLoadMoreCommentOrNot}</div>
        </div>
    );
}

export default Comments;
