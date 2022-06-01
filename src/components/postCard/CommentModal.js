import React from 'react';
import ContentPost from './ContentPost'
import ReactionPost from './ReactionPost';

function CommentModal() {
    return (
        <div className='modal'>
            <div className='overlay'></div>
            <div className='modal-content'>
                <ContentPost />
                <ReactionPost />
            </div>
            <div className='comments'>
                <div className='d-flex mb-2'>
                    <div className='user-avatar'>
                        <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                    </div>
                    <div>
                        <div>Đây là một lời bình luận</div>
                        <div className='fs-smaller text-secondary'>2 giờ trước</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentModal;
