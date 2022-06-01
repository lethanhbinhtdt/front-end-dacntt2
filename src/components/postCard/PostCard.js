import React from 'react';

import AuthorPost from './AuthorPost';
import ContentPost from './ContentPost';
import ReactionPost from './ReactionPost';
import Comments from './Comments';

import '../../css/PostCard.css';

function PostCard(props) {

    return (
        <div>
            <div className='post-card'>
                {/* Người đăng */}
                <AuthorPost/>

                {/* Nội dung */}
                <ContentPost/>

                {/* like/comment/share */}
                <ReactionPost/>
                {/* comments temp */}
                <Comments/>
            </div>
        </div>
    );
}

export default PostCard;
