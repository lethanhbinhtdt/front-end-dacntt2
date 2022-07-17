import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../middlewares/axios';
import { CHAT_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common';

function ConversationList(props) {
    const { currUserInfo, handleChatWithOther, chatWithUser } = props;
    const token = getCookieToken();
    const [conversation, setConversation] = useState();

    useEffect(() => {
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
                console.error(err)
            })
    }, [])


    return (
        <div>
            {conversation &&
                conversation.map(item => (
                    // hiển thị member có id khác currUserInfo
                    <div key={item?.conversationId._id} className={chatWithUser?._id === item?.senderId?._id ? 'friend-info active-chat' : 'friend-info'} onClick={() => handleChatWithOther(item.senderId, item.conversationId._id)}>
                        <img className='title-item user-img rounded-circle'
                            src={item?.senderId?.picture}
                            alt='Avatar user'>
                        </img>
                        { console.log(item.senderId)}
                        <div className='title-item flex-column ms-2 text-start'>
                            <Link to={`/personal/${item?.senderId?._id}/post/`} className='user-name'>
                                {item?.senderId?.fullname}
                            </Link>
                            {/* TODO check online?text-success: text-secondary*/}
                            <div className='text-secondary fs-small'>
                                {item?.senderId?.isOnline? <div className='text-success'>Đang hoạt động</div>:  <div className='text-secondary'>Đang ngoại tuyến</div> }
                               
                            </div>
                        </div>
                    </div>

                ))}
        </div>
    );
}

export default ConversationList;
