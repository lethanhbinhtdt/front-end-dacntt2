import React from 'react';

function MessageList(props) {
    
    return (
        <div>
            {/* 1 */}
            <div className='d-flex mt-2'>
                <div className='message-user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                </div>
                <div className='message-content w-100'>
                    <div><b>Username</b></div>
                    <div className='text-viewed'>mẫu tin nhắn đã đọc</div>
                </div>
            </div>

            {/* 2 */}
            <div className='d-flex mt-2'>
                <div className='message-user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                </div>
                <div className='message-content w-100'>
                    <div><b>Username</b></div>
                    <div className='unread-text'>Đây là tin nhắn chưa đọc</div>
                </div>
            </div>

            {/* 2 */}
            <div className='d-flex mt-2'>
                <div className='message-user-avatar'>
                    <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                </div>
                <div className='message-content w-100'>
                    <div><b>Username</b></div>
                    <div className='unread-text'>Đây là tin nhắn chưa đọc nhưng dài...</div>
                </div>
            </div>
        </div>
    );
}

export default MessageList;
