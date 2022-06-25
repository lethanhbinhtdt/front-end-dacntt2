import React from 'react';

import '../../css/PostBox.css'

import PostModal from './PostModal';

function PostBox(props) {

    const {onCreatePost} = props
    return (
        <div className='post-box'>
            <div className='d-flex'>
                <div className='user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/24x24'></img>
                </div>
                <div className='w-100'>
                    <PostModal onCreatePost = {onCreatePost}/>
                </div>
            </div>
        </div>
    );
}

export default PostBox;
