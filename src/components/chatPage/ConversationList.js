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
                    item.members.filter(i => i._id !== currUserInfo?._id).map(member => (
                        <div key={member._id} className={chatWithUser._id === member._id ? 'friend-info active-chat' : 'friend-info'} onClick={() => handleChatWithOther(member, item._id)}>
                            <img className='title-item user-img rounded-circle'
                                src={member.picture}
                                alt='Avatar user'>
                            </img>
                            <div className='title-item flex-column ms-2 text-start'>
                                <Link to={`/personal/${member._id}/post/`} className='user-name'>
                                    {member.fullname}
                                </Link>
                                {/* TODO check online?text-success: text-secondary*/}
                                <div className='text-secondary fs-small'>
                                    <div className='text-success'>Đang hoạt động</div>
                                    <div className='text-secondary'>Hoạt động 1 giờ trước</div>
                                </div>
                            </div>
                        </div>
                    ))

                ))}
        </div>
    );
}

export default ConversationList;
