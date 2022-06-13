import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import {NUMBER_NEXT_LOAD} from '../../middlewares/constant'
function Comments(props) {
    const {onloadmoreComment, dataComment} = props
    const [datacommentState, setDataComment] = useState(dataComment? dataComment: " ")
    const [textLoadMoreCommentOrNot, SetTextLoadMoreCommentOrNot] = useState("Xem thêm 5 bình luận khác")

    const [postInfo, setPostInfo] = useState(props ? props.dataComment : "");

    useEffect(() => {
        if(datacommentState?.length !== dataComment?.length){
            setDataComment(dataComment)
        }
        // check thêm nếu đã hết comment thiof ko hiển thị chữ nữa

    },  [ dataComment ])

    console.log("du lieu nhan tuwf pparent trong comment",datacommentState )
    var listComment = []


    for (var i = 0; i < datacommentState?.length; i++) {
        listComment.push(
            <div key = {datacommentState[i]?._id} className='mb-3 d-flex d-row'>
                <img className='comment-img' src='http://via.placeholder.com/32x32' alt='Avatar user'></img>
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
                                <Dropdown.Item >Sửa</Dropdown.Item>
                                <Dropdown.Item >Xóa</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='text-justify'>
                        {datacommentState[i].content}
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>
            <hr></hr>
            {listComment}
            <div className='text-link text-secondary fs-smaller' onClick={onloadmoreComment}>{textLoadMoreCommentOrNot} </div>
        </div>
    );
}

export default Comments;
