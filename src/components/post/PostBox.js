import React from 'react';

import '../../css/PostBox.css'

function PostBox() {
    return (
        <div className='post-box'>
            <div className='d-flex'>
                <div className='user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/24x24'></img>
                </div>
                <div className='w-100'>
                    <button type='button' className='btn btn-post'>Bạn đang nghĩ gì?</button>
                </div>
            </div>
        </div>
    );
}

export default PostBox;
