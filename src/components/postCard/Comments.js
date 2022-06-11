import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
function Comments(props) {
    const {onloadmore, dataComment} = props
    const [numberComment, setNumberComment] = useState(5)
    const [postInfo, setPostInfo] = useState(props ? props.dataComment : "");
    const refPostId = useRef('')

    const commentInfo = props.dataComment
    // setPostInfo(commentData)
    console.log("asdfasdfasd", commentInfo)

    useEffect(()=>{
        refPostId.
    })
    var listComment = []
    var listCommentAfterLoad = []
    var commentData = commentInfo?.commentPost
    for (var i = 0; i < commentInfo?.commentPost.length; i++) {
        listComment.push(
            <div className='mb-3 d-flex d-row'>
                <img className='comment-img' src='http://via.placeholder.com/32x32' alt='Avatar user'></img>
                <div className='flex-column comment-content'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Link to={`/personal/${commentData[i]?.createdBy?._id}/post/`} state={{ "id": commentData[i]?.createdBy?._id }} className='text-dark text-decoration-none'><b>{commentData[i]?.createdBy?.fullname}</b></Link>
                            <div className='text-secondary fs-smaller'>
                                {commentData[i]?.createdAt}
                            </div>
                        </div>

                        {/* sửa/xóa */}
                        <Dropdown>
                            <Dropdown.Toggle className='ms-2 rounded-pill py-0 bg-my-color border-0 text-dark'>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >Sửa</Dropdown.Item>
                                <Dropdown.Item >Xóa</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='text-justify'>
                        {commentData[i].content}
                    </div>
                </div>

            </div>
        )
    }

    const handleGetComment = (infoPost) => {
        console.log("vao  comment get data ")
        var postId = infoPost?._id
        const token = getCookieToken()
        // const [postInfo, setPostInfo] = useState()
        console.log(postId)
        fetch(`${BASE_URL}api/post/${postId}/comment/?start=${numberComment}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // body: JSON.stringify(yourNewData)
        })
            .then(res => {
                if (res.ok) {

                    console.log(commentData?.length)
                    setNumberComment(numberComment + commentData?.length)
                    console.log("n7umber c ommnet ", numberComment)
                    var commentData = res.json()
                    postId = commentData?.postId
                    var listCommentAfterLoad = document.getElementById("comment" + postId)

                    for (var i = 0; i < commentData.length; i++) {
                        // listCommentAfterLoad.push(
                            listCommentAfterLoad.append(<div className='mb-3 d-flex d-row'>
                                <img className='comment-img' src='http://via.placeholder.com/32x32' alt='Avatar user'></img>
                                <div className='flex-column comment-content'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <Link to={`/personal/${commentData[i]?.createdBy?._id}/post/`} state={{ "id": commentData[i]?.createdBy?._id }} className='text-dark text-decoration-none'><b>{commentData[i]?.createdBy?.fullname}</b></Link>
                                            <div className='text-secondary fs-smaller'>
                                                {commentData[i]?.createdAt}
                                            </div>
                                        </div>

                                        {/* sửa/xóa */}
                                        <Dropdown>
                                            <Dropdown.Toggle className='ms-2 rounded-pill py-0 bg-my-color border-0 text-dark'>
                                                <FontAwesomeIcon icon={faEllipsis} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item >Sửa</Dropdown.Item>
                                                <Dropdown.Item >Xóa</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className='text-justify'>
                                        {commentData[i].content}
                                    </div>
                                </div>

                            </div>
                        // )
                            )
                    }
                    // parentDivOfCommentInpost.appendChild(listCommentAfterLoad)
                }
            })
            .catch(e => {
                console.error(e)
            })

    }
    return (
        <div>
            <hr></hr>
            {listComment}
            {listCommentAfterLoad}
            <div className='text-link text-secondary fs-smaller' onClick={() => handleGetComment(postInfo)}>Xem thêm 10 bình luận khác </div>
        </div>
    );
}

export default Comments;
