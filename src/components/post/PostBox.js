import React, {useState} from 'react';

import '../../css/PostBox.css'

import PostModal from './PostModal';

function PostBox(props) {

    const { onCreatePost } = props
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className='post-box'>
            <div className='d-flex'>
                <div className='user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/24x24'></img>
                </div>
                <div className='w-100'>
                    <button onClick={() => setOpenModal(o => !o)} type='button' className='btn btn-post'>Bạn đang nghĩ gì?</button>

                    <PostModal onCreatePost={onCreatePost} openModal={openModal} setOpenModal={setOpenModal}/>
                </div>
            </div>
        </div>
    );
}

export default PostBox;
