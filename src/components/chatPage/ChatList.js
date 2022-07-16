import React, { useEffect, useState, useContext, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faComment } from '@fortawesome/free-solid-svg-icons'

import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import { SocketContext } from '../../middlewares/socket';

function ChatList(props) {
    const { currUserInfo, conversationId } = props
    const [mess, setMess] = useState() // mess này dùng để chứa các message được gửi lên từ backend
    const [numberMess, setnumberMess] = useState(0)
    const [message, setMessage] = useState('')// message này ở trong ô input type để hiện thị chữ khi nhập  va lấy giá trị nhập vào 
    const [checkHaveNewMessage, setCheckHaveNewMessage] = useState(false)
    const [newMess, setNewMess] = useState()

    const messageRef = useRef(null)
    const socket = useContext(SocketContext);

    var token = getCookieToken()

    var listMess = []
    useEffect(() => {
        socket.on('receiveNewMess', data => {
            setCheckHaveNewMessage(true)
            setNewMess(data)
        })
    }, [socket])

    useEffect(() => {
        if (checkHaveNewMessage && mess?.length > 0) {
            setMess([...[newMess], ...mess])
        }
        setCheckHaveNewMessage(false)
    }, [checkHaveNewMessage])

    useEffect(() => {
        if (conversationId) {
            fetch(`${BASE_URL}api/conversation/${conversationId}/message`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }

            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then(messData => {
                    setMess(messData)
                    setnumberMess(numberMess + messData?.length)
                })
        }
    }, [conversationId])

    useEffect(() => {
        messageRef.current?.scrollIntoView() // tự động scroll xuống cuối 
    }, [mess])

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.length > 0) {
            fetch(`${BASE_URL}api/message`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "conversationId": conversationId,
                        "mess": message
                    })
                })
                .then((res) => {
                    setMessage('')
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then((newMess) => {

                    setMess([...[newMess], ...mess])
                })
        }
    }

    for (var i = mess?.length - 1; i >= 0; i--) {
        if (mess[i]?.senderId?._id === currUserInfo._id) {
            listMess.push(
                <div key={mess[i]?._id} className='author-message'>
                    <div className='author-message-content'>{mess[i]?.text}</div>
                </div>)
        }
        else {
            listMess.push(

                <div key={mess[i]?._id} className='client-message'>
                    <img className='user-img rounded-circle'
                        src={mess[i]?.senderId?.picture}
                        alt='Avatar user'>
                    </img>
                    <div className='client-message-content'>{mess[i]?.text}</div>
                </div>

            )
        }
    }
    //   <div  ref = {messageRef}/>  để tự động sroll xuống cuối
    return (
        <>
            <div className='flex-grow-1 over-y-auto'>
                {listMess}
                <div ref={messageRef} />
            </div>

            <form className='border border-secondary rounded-pill px-3 d-flex send-message bg-light my-3 me-3' onSubmit={handleSendMessage}>
                <FontAwesomeIcon icon={faComment} className='mx-2 my-auto' />
                <input onChange={handleInputChange} value={message} type='text' className='message-input py-2 pe-3' placeholder='Nhập tin nhắn...'></input>
                <button type='submit' className='btn'><FontAwesomeIcon icon={faPaperPlane} className='my-auto' /></button>
            </form>

        </>
    );
}

export default ChatList;
