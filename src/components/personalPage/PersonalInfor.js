import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams  } from 'react-router-dom';

import { BASE_URL } from '../../middlewares/constant';
import {getCookieToken} from '../../middlewares/common'
import { data } from 'autoprefixer';

import PostCard from "../postCard/PostCard"
import Friend from "./Friend"
import Infor from "./Infor"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';

import '../../css/PersonalInfor.css';

function PersonalInfor(props) {
    const { id } = useParams();
    const [activeMenu, setActiveMenu] = useState()
    const [info, setInfo] = useState()
    const location = useLocation();
    const [idUser, setIdUser] =  useState(location.state ? location.state.id : null); 
    const [buttonTextSendRequestFriend, setButtonTextSendRequestFriend] = useState("Gửi lời mời")
    console.log("id:", id)
    // const [idUser, setIdUser] =  useState(id ? id : ""); 
    const token = getCookieToken()
    // const location = useLocation();
    // setIdUser(location.state)
    // const data = location.state


    useEffect(()=>{
        console.log("da cahy der lay du lieu usser")
        fetch(`${BASE_URL}api/profile/${idUser}`, 
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                // body: JSON.stringify(yourNewData)
            }
         
        )
        .then((res)=>{
          if(res.ok){
              return res.json()
          }
        })
        .then(data=>{
            setInfo(data)
        })
        .catch(err=>{
            console.error(err)
        })
    }, []) // [] để useEffect ko load lại mỗi khi có sự thay đổi ==> khi gọi vào component này thì chỉ fetch 1 lần
    
    function SendFriendRequest(e){
        console.log(e.target)
        var idUserWantoSendRequest = e.target.attributes.getNamedItem('iduserrequest').value;

        fetch(`${BASE_URL}api/requestFriend/${idUserWantoSendRequest}`, 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // body: JSON.stringify(yourNewData)
        })
        .then(res=>{
            if(res.ok){
                return res.json()
            }
        })
        .then(textOfButton=>{
            console.log(textOfButton)
            setButtonTextSendRequestFriend(textOfButton)
        })
        .catch(err=>{
            console.error(err)
        })
    }
    const sendRequestFriendAndChat = []
    if( !info?.isCurrentUserLoginPage){
        sendRequestFriendAndChat.push(              
        <div className="col-12 col-md-auto mt-2 mt-md-0 mb-md-3">


        <a iduserrequest = {info?._id}  className="btn btn-primary d-block d-md-inline-block lift send-friend-request" onClick= {SendFriendRequest}>
            gui loiw moifs
        </a>

        <a className="btn btn-primary d-block d-md-inline-block lift">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-dots-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg> Nhắn tin
        </a>

    </div>)
    }

    return (
        <div className='container'>

            <div className="card bg-light listcard">
                <div className="card-body h-100">
                    <div className="header">
                        <img src='http://via.placeholder.com/1000x200' alt='Blog img' className='header-img-top' width="100%" height="100%"></img>

                        <div className="container-fluid">
                            <div className="header-body mt-n5 mt-md-n6">
                                <div className="row align-items-end">

                                    <div className="col-auto">


                                        <div className="avatar avatar-xxl header-avatar-top">
                                            <img src={info?.picture} width="256" hight="256" className="avatar-img rounded-circle border border-4 border-body"></img>
                                        </div>

                                    </div>
                                    <div className="col mb-3 ml-n3 ml-md-n2">


                                            <h1 className="header-title">
                                            {info?.fullname}
                                        </h1>
                                        <h6 className="header-pretitle">
                                            Class: {info?.className}
                                        </h6>

                                    </div>
                                    {sendRequestFriendAndChat}
                      
                                </div>
                                <div className="row align-items-center">
                                    <div className="col">


                                        <ul className="nav nav-tabs nav-overflow header-tabs">
                                            <li className="nav-item">
                                                {/* <a href="/personal/post" className="nav-link  active" onClick={()=>handleClickItem()}>
                                                Bài đăng
                                            </a> */}
                                                <Link id='post' to={`/personal/${idUser}/post`} className={activeMenu === 'post' ? 'active nav-link' : 'nav-link'} onClick={() => { setActiveMenu('post') }}>Bài đăng</Link>
                                            </li>
                                            <li className="nav-item">
                                                {/* <a href="/personal/friend" className="nav-link">
                                                Bạn bè
                                            </a> */}
                                                <Link id='friend' to={`/personal/${idUser}/friend`} className={activeMenu === 'friend' ? 'active nav-link' : 'nav-link'} onClick={() => { setActiveMenu('friend') }}>Bạn bè</Link>
                                            </li>
                                            <li className="nav-item">
                                                {/* <a href="/personal/infomation" className="nav-link">
                                                Thông tin 
                                            </a> */}
                                                <Link id='infomation' to={`/personal/${idUser}/infomation`} className={activeMenu === 'infomation' ? 'active nav-link' : 'nav-link'} onClick={() => { setActiveMenu('infomation') }}>Thông tin</Link>
                                            </li>

                                            <button type="button" className="btn-dot"><FontAwesomeIcon icon={faEllipsisH}/> </button>
                                            
                                        </ul>

                       

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
    
                </div>

                <Routes>
                    <Route path="/:id/post" element={<PostCard/>}></Route>
                    {/* <Route path="/post"     component={() =><PostCard id={idUser} />}></Route> */}
                    <Route path="/:id/friend" element={<Friend/>}></Route>
                    <Route path="/:id/infomation" element={<Infor />}></Route>
                </Routes>
            </div>
        </div>


    )
}

export default PersonalInfor;