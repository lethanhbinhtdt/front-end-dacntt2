import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
function Comments(props) {
    const {onloadmoreComment, dataComment} = props
    const [datacomment1, setDataComment] = useState(dataComment? dataComment: " ")

    const [postInfo, setPostInfo] = useState(props ? props.dataComment : "");
    // setPostInfo(commentData)

    useEffect(() => {
        dataComment === datacomment1 || setDataComment(dataComment) // dùng useEffect kiểm tra nếu props thay đổi giá trị mới 
    },  [ dataComment ])

    console.log("du lieu nhan tuwf pparent trong comment",datacomment )
    var listComment = []


    for (var i = 0; i < datacomment?.length; i++) {
        listComment.push(
            <div key = {datacomment[i]?._id} className='mb-3 d-flex d-row'>
                <img className='comment-img' src='http://via.placeholder.com/32x32' alt='Avatar user'></img>
                <div className='flex-column comment-content'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Link to={`/personal/${datacomment[i]?.createdBy?._id}/post/`} state={{ "id": datacomment[i]?.createdBy?._id }} className='text-dark text-decoration-none'><b>{datacomment[i]?.createdBy?.fullname}</b></Link>
                            <div className='text-secondary fs-smaller'>
                                {datacomment[i]?.createdAt}
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
                        {datacomment[i].content}
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>
            <hr></hr>
            {listComment}
            <div className='text-link text-secondary fs-smaller' onClick={onloadmoreComment}>Xem thêm 10 bình luận khác </div>
        </div>
    );
}

export default Comments;
