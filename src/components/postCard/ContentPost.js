import React from 'react';
import { useState, useEffect } from 'react'
import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
function ContentPost(props) {
    const dataPost = props.dataPostInfo
    console.log("da co data", dataPost)
    var listPost = []
    // for(var i = 0; i< dataPost?.length ; i++){

    var imageField = []
    var videoField = ''

    for (var i = 0; i < dataPost?.image?.length; i++) {
        if (dataPost?.image) {
            imageField.push(<div className='text-center mt-2'><img src={dataPost?.image[i]} alt='Blog img' className='img-fluid post-img'></img></div>)
        }
    }
    if (dataPost?.video) {
        videoField = <div className='text-center mt-2'><iframe title='post ytb video' src='https://www.youtube.com/embed/jn8NhISy9rg' frameBorder='0' className='post-ytb' allowFullScreen></iframe> </div>
    }

    // listPost.push( 
    //     <>
    // <p>{dataPost?.content}</p>
    // {imageField}
    // {videoField}
    // </>
    // )
    // }
    return (
            <div className='text-justify'>
                <p>{dataPost?.content}</p>
                {imageField}
                {videoField}
            </div>
    );
}

export default ContentPost;
