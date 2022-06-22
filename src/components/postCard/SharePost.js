
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import '../../css/SharePost.css';
function SharePost(props) {
    const [postShare, setPostShare] = useState()
    const {infoPostShare} = props
    useEffect(()=>{
        setPostShare(infoPostShare)
    }, [infoPostShare])

    
    var imageField = []
    var videoField = []
    if (postShare?.image) {
        for (var i = 0; i < postShare?.image?.length; i++) {
                imageField.push(<div className='text-center mt-2'><img src={postShare?.image[i]} alt='Blog img' className='img-fluid post-img'></img></div>)
        }
    }
    if (postShare?.video) {
        videoField.push(<div className='text-center mt-2'><iframe title='post ytb video' src={postShare.video} frameBorder='0' className='post-ytb' allowFullScreen></iframe> </div>)
    }
    return (
        <div className='post-card-share'>
            <div className = 'post-info'>
            {/* Người đăng */}
            <div>
                {/* Người đăng */}
                <div className='d-flex justify-content-between'>
                    <div className='d-flex d-row'>
                        <img className='post-auth-img rounded-circle'
                            src={postShare?.createdBy?.picture}
                            alt='Avatar user'></img>
                        <div className='flex-column ms-2'>
                            <Link to='/user/profile/' className='post-auth-name'>
                                <b>{postShare?.createdBy?.fullname} </b>
                            </Link>
                            <p className='text-secondary fs-small'>
                                {postShare?.createdBy?.createdAt}
                            </p>
                        </div>
                    </div>
                    {/* sửa/xóa */}

                </div>
            </div>

            {/* Nội dung */}
            <div className='text-justify'>
                <p>{postShare?.content}</p>
                {imageField}
                {videoField}
            </div>
            </div>
        </div>

    )
}

export default SharePost;