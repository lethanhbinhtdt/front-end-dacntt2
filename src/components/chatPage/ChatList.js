import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faPaperPlane, faComment } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

import ConversationList from './ConversationList';

import '../../css/chatPage.css'

function ChatList(props) {
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
        <>
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
        </>
    );
}

export default ChatList;
