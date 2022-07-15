import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../middlewares/axios';
import { CHAT_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common';

function MessageList(props) {
    const { currUserInfo } = props;
    const token = getCookieToken();
    const navigate = useNavigate();

    const [conversation, setConversation] = useState();

    useEffect(() => {
        // get all conversation
        axios.get(CHAT_URL,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res.status === 200)
                    setConversation(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    const chatWithOther = (otherUser) => {
        navigate('/chat', { replace: true, state: { otherUser: otherUser } });
    }

    const navigateToOther = (id) => {
        navigate(`/personal/${id}/post/`, { replace: true, state: { 'id': id } });
    }

    return (
        <div>

            {conversation &&
                conversation.slice(0, 5).map(item => (
                    <div key={item.conversationId._id} className='d-flex mt-2 cursor-pointer'>
                        <div className='message-user-avatar'>
                            <img alt='user avatar' src={item?.senderId?.picture} onClick={() => { chatWithOther(item?.senderId) }}></img>
                        </div>

                        <div className='message-content w-100'>
                            <div onClick={() => { navigateToOther(item?.senderId?._id) }}><b>{item?.senderId?.fullname}</b></div>
                            <div className='message-content' onClick={() => { chatWithOther(item?.senderId) }}>{item?.text}</div>
                        </div>
                    </div>

                ))
            }
        </div>
    );
}

export default MessageList;
