import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostCard from "../postCard/PostCard"
import Friend from "./Friend"
import Infor from "./Infor"
import '../../css/PersonalInfor.css';


function PersonalInfor() {
    return (
        <>
        <div className="card bg-light listcard">
            <div className="card-body h-100">
                <div className="header">

                <img src='http://via.placeholder.com/1000x200' alt='Blog img' className='header-img-top' width="100%" height="100%"></img>

                    <div className="container-fluid">
                        <div className="header-body mt-n5 mt-md-n6">
                            <div className="row align-items-end">

                                <div className="col-auto">


                                    <div className="avatar avatar-xxl header-avatar-top">
                                    <img src='http://via.placeholder.com/200x200' width="256"  hight="256" className="avatar-img rounded-circle border border-4 border-body"></img>
                                    </div>

                                </div>
                                <div className="col mb-3 ml-n3 ml-md-n2">


                                    <h1 className="header-title">
                                        NGUYỄN XUÂN THỊNH
                                    </h1>
                                    <h6 className="header-pretitle">
                                        Class:
                                    </h6>

                                </div>
                                <div className="col-12 col-md-auto mt-2 mt-md-0 mb-md-3">


                                <a  className="btn btn-primary d-block d-md-inline-block lift send-friend-request">
                                  Gửi lời mời
                                </a>

                                <a className="btn btn-primary d-block d-md-inline-block lift">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-dots-fill" viewBox="0 0 16 16">
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                    </svg> Nhắn tin
                                </a>
                
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col">


                                    <ul className="nav nav-tabs nav-overflow header-tabs">
                                        <li className="nav-item">
                                            <a href="/personal/post" className="nav-link active">
                                                Bài đăng
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/personal/friend" className="nav-link">
                                                Bạn bè
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/personal/infomation" className="nav-link">
                                                Thông tin 
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <Routes>
            <Route path = "/post" element ={<PostCard/>}></Route>
            <Route path = "/friend" element = {<Friend/>}></Route>
            <Route path = "/infomation" element ={<Infor/>}></Route>
            </Routes>

        </>
    )
}

export default PersonalInfor;