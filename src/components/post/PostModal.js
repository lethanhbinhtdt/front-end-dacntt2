import React from 'react';
import Popup from 'reactjs-popup'

import PostModalContent from './PostModalContent';

function PostModal() {
    return (
        <div>
            <Popup 
                trigger={<button type='button' className='btn btn-post'>Bạn đang nghĩ gì?</button>}
                modal
            >
                {close => (
                    <div className='post-modal'>
                        {/* header */}
                        <div className='header d-flex justify-content-between'>
                            <div> </div>
                            <h4 className='text-center'>Tạo bài viết</h4>
                            <button className='close-button text-right' onClick={close}>
                                &times;
                            </button>
                        </div>
                        <hr className='mt-2 mb-3'></hr>

                        {/* user info */}
                        <div className='user d-flex'>
                            <div className='user-avatar mb-3'>
                                <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                            </div>
                            <b>Username</b>
                        </div>
                        
                        {/* content */}
                        <div className='content mb-3'>
                            <textarea rows='6' className='w-100' placeholder='Bạn đang nghĩ gì?'></textarea>
                        </div>

                        {/* footer */}
                        <div>
                            <button type='button' className='btn btn-primary w-100'>Đăng</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}

export default PostModal;
