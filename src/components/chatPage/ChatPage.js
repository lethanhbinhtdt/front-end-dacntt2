import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faPaperPlane, faComment } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

import ConversationList from './ConversationList';
import ChatList from './ChatList';

import '../../css/chatPage.css'

function ChatPage(props) {
    const { currUserInfo, otherUser } = props
    const [message, setMessage] = useState('')
    const [chatWithUser, setChatWithUser] = useState(otherUser ? otherUser : '') // người đang nhắn tin cùng


    const handleChatWithOther = (user) => {
        setChatWithUser(user);
    }

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log('send: ', message);
    }

    return (
        <div className='chat-page mt-3'>
            {/* Title */}
            <div className='title-row'>
                {/* Box1 thông tin currUser */}
                <div className='first-box d-flex justify-content-between'>
                    <div></div>
                    <div className='title-item'>{currUserInfo?.fullname}</div>
                    <div className='title-item cursor-pointer'><FontAwesomeIcon icon={faPenToSquare} /></div>
                </div>

                {/* Box2 thông tin other user */}
                <div className='second-box d-flex justify-content-between'>
                    {/* Other user info */}
                    {chatWithUser &&
                        <>
                            <div className='d-flex d-row'>
                                <img className='title-item user-img rounded-circle'
                                    src={chatWithUser.picture}
                                    alt='Avatar user'>
                                </img>
                                <div className='title-item flex-column ms-2 text-start'>
                                    <Link to={`/personal/${chatWithUser._id}/post/`} className='user-name'>
                                        {chatWithUser.fullname}
                                    </Link>
                                    {/* TODO: online?success:secondary */}
                                    <div className='text-secondary fs-small'>
                                        {/* <div className='text-success'>Đang hoạt động</div> */}
                                        <div className='text-secondary'>Hoạt động 1 giờ trước</div>
                                    </div>
                                </div>
                            </div>
                            <div className='title-item cursor-pointer text-secondary'><FontAwesomeIcon icon={faCircleInfo} /></div>
                        </>
                    }

                </div>
            </div>
            {/* Content */}
            <div className='content-row d-flex'>
                {/* Box3 danh sách bạn bè */}
                <div className='third-box'>
                    <ConversationList currUserInfo={currUserInfo} handleChatWithOther={handleChatWithOther}/>
                </div>

                {/* Box4 hiển thị tin nhắn */}
                <div className='fourth-box d-flex flex-column'>
                    <ChatList currUserInfo={currUserInfo} />

                    <form onSubmit={handleSendMessage} className='border border-secondary rounded-pill px-3 d-flex send-message bg-light my-3 me-3'>
                        <FontAwesomeIcon icon={faComment} className='mx-2 my-auto' />
                        <input onChange={handleInputChange} type='text' className='message-input py-2 pe-3' placeholder='Nhập tin nhắn...'></input>
                        <button type='submit' className='btn'><FontAwesomeIcon icon={faPaperPlane} className='my-auto' /></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
