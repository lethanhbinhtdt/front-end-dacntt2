import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import axios from '../../middlewares/axios';
import { CHAT_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common';

function MessageList(props) {
    const { currUserInfo } = props;
    const token = getCookieToken();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
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
                setLoading(false)
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
            {loading ?
                <div className='w-100 text-center mt-3'><ClipLoader color={'#5239AC'} loading={loading} size={48} /></div>
                :
                conversation &&
                conversation.slice(0, 5).map(item => (
                    <div key={item.conversationId?._id} className='d-flex mt-2 p-1 cursor-pointer msg-hover'>
                        <div className='message-user-avatar'>
                            <img alt='user avatar' src={item.senderId?.picture} onClick={() => { chatWithOther(item.senderId) }}></img>
                        </div>
                        <div className='message-content w-100'>
                            <div onClick={() => { navigateToOther(item.senderId?._id) }}><b>{item.senderId?.fullname}</b></div>
                            <div className='message-content' onClick={() => { chatWithOther(item.senderId) }}>{item.text}</div>
                        </div>
                    </div>

                ))
            }
        </div>
    );
}

export default MessageList;
