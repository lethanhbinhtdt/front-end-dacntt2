import React from 'react';
import { useState, useEffect } from 'react'
import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import SharePost from './SharePost';
function ContentPost(props) {
    const dataPost = props.dataPostInfo

    var imageField = []
    var videoField = []
    if (dataPost?.image) {
        for (var i = 0; i < dataPost?.image?.length; i++) {
            imageField.push(<div className='text-center mt-2'><img src={dataPost?.image[i]} alt='Blog img' className='img-fluid post-img'></img></div>)
        }
    }
    if (dataPost?.video) {
        videoField.push(<div className='text-center mt-2'><iframe title='post ytb video' src='https://www.youtube.com/embed/jn8NhISy9rg' frameBorder='0' className='post-ytb' allowFullScreen></iframe> </div>)
    }
    const contents = []
    if (dataPost?.rootPost) {
        contents.push(<SharePost infoPostShare={dataPost?.rootPost} />)
    }
    else {
        contents.push(<><p>dataPost?.content</p>
            {imageField}
            {videoField}
        </>)
    }

    // }
    return (
        <div className='text-justify'>
            {contents}
        </div>
    );
}

export default ContentPost;
