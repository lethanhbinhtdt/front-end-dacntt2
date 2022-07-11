import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
                conversation.map(item => (
                    item.members?.filter(i => i._id !== currUserInfo?._id).map(member => (
                        <div key={member._id} className='d-flex mt-2 cursor-pointer'>
                            <div className='message-user-avatar'>
                                <img alt='user avatar' src={member.picture} onClick={() => {navigateToOther(member._id)}}></img>
                            </div>
                            <div className='message-content w-100'>
                                <div onClick={() => {navigateToOther(member._id)}}><b>{member.fullname}</b></div>
                                <div className='message-content' onClick={() => {chatWithOther(member)}}>mẫu tin nhắn daimẫu tin nhắn daimẫu tin nhắn daimẫu tin nhắn daimẫu tin nhắn dai</div>
                            </div>
                        </div>
                    ))
                ))
            }
            {/*
                TODO: tin nhắn đã xem hay chưa
                <div className='text-viewed'>mẫu tin nhắn đã đọc</div>
                <div className='unread-text'>Đây là tin nhắn chưa đọc</div>iv>
            */}

        </div>
    );
}

export default MessageList;
