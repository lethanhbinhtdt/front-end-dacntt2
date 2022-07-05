import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faPaperPlane, faComment } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

import '../../css/chatPage.css'

function ChatPage(props) {
    const { currUserInfo } = props
    const [message, setMessage] = useState("")
    let friend = [];

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
                    <div className='d-flex d-row'>
                        <img className='title-item user-img rounded-circle'
                            src='https://res.cloudinary.com/drxflbnoa/image/upload/v1656945736/62b08fc6ed61f4ee38395a4c/nszbhkklq3zwqip24dsq.png'
                            alt='Avatar user'>
                        </img>
                        <div className='title-item flex-column ms-2 text-start'>
                            <Link to={`/personal/${friend?._id}/post/`} className='user-name' state={{ 'id': friend?._id }}>
                                Friend Username
                            </Link>
                            <div className='text-secondary fs-small text-success'>
                                Đang hoạt động
                            </div>
                        </div>
                    </div>

                    <div className='title-item cursor-pointer text-secondary'><FontAwesomeIcon icon={faCircleInfo} /></div>
                </div>
            </div>
            {/* Content */}
            <div className='content-row d-flex'>
                {/* Box3 danh sách bạn bè */}
                <div className='third-box'>

                    <div className='friend-info'>
                        <img className='title-item user-img rounded-circle'
                            src='https://res.cloudinary.com/drxflbnoa/image/upload/v1656945736/62b08fc6ed61f4ee38395a4c/nszbhkklq3zwqip24dsq.png'
                            alt='Avatar user'>
                        </img>
                        <div className='title-item flex-column ms-2 text-start'>
                            <Link to={`/personal/${friend?._id}/post/`} className='user-name' state={{ 'id': friend?._id }}>
                                Friend Username
                            </Link>
                            <div className='text-secondary fs-small text-success'>
                                Đang hoạt động
                            </div>
                        </div>
                    </div>

                    <div className='friend-info'>
                        <img className='title-item user-img rounded-circle'
                            src='https://res.cloudinary.com/drxflbnoa/image/upload/v1656945736/62b08fc6ed61f4ee38395a4c/nszbhkklq3zwqip24dsq.png'
                            alt='Avatar user'>
                        </img>
                        <div className='title-item flex-column ms-2 text-start'>
                            <Link to={`/personal/${friend?._id}/post/`} className='user-name' state={{ 'id': friend?._id }}>
                                Friend Username
                            </Link>
                            <div className='text-secondary fs-small text-secondary'>
                                Hoạt động 1 giờ trước
                            </div>
                        </div>
                    </div>

                </div>

                {/* Box4 hiển thị tin nhắn */}
                <div className='fourth-box d-flex flex-column'>
                    {/* chat list */}
                    <div className='flex-grow-1 chat-list'>

                        {/* message from author to client */}
                        <div className='author-message'>
                            <div className='author-message-content'>Chào client</div>
                        </div>

                        {/* message from client */}
                        <div className='client-message'>
                            <img className='user-img rounded-circle'
                                src='https://res.cloudinary.com/drxflbnoa/image/upload/v1656945736/62b08fc6ed61f4ee38395a4c/nszbhkklq3zwqip24dsq.png'
                                alt='Avatar user'>
                            </img>
                            <div className='client-message-content'>chào author</div>
                        </div>

                        {/* message from client */}
                        <div className='client-message'>
                            <img className='user-img rounded-circle'
                                src='https://res.cloudinary.com/drxflbnoa/image/upload/v1656945736/62b08fc6ed61f4ee38395a4c/nszbhkklq3zwqip24dsq.png'
                                alt='Avatar user'>
                            </img>
                            <div className='client-message-content'>chào authorChào clientChào clientChào clientChào clientChào clientChào clientChào clientChào client</div>
                        </div>
                        {/* message from author to client */}
                        <div className='author-message'>
                            <div className='author-message-content'>Chào clientChào clientChào clientChào clientChào clientChào clientChào clientChào client</div>
                        </div>
                        {/* message from client */}
                        <div className='client-message'>
                            <img className='user-img rounded-circle'
                                src='https://res.cloudinary.com/drxflbnoa/image/upload/v1656945736/62b08fc6ed61f4ee38395a4c/nszbhkklq3zwqip24dsq.png'
                                alt='Avatar user'>
                            </img>
                            <div className='client-message-content'>chào author</div>
                        </div>
                    </div>
                    {/* END chat list */}

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
