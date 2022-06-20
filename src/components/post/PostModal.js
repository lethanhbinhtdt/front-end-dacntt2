import React from 'react';
import Popup from 'reactjs-popup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import PostModalContent from './PostModalContent';

function PostModal() {
    return (
        <div>
            <Popup
                trigger={<button type='button' className='btn btn-post'>Bạn đang nghĩ gì?</button>}
                modal
                nested
            >
                {close => (
                    <div className='post-modal'>
                        {/* header */}
                        <div className='header d-flex justify-content-between'>
                            <div> </div>
                            <h4 className='text-center'>Tạo bài viết</h4>
                            <button className='close-button text-right' onClick={close}>
                                &times;
                            </button>
                        </div>
                        <hr className='mt-2 mb-3'></hr>

                        {/* user info */}
                        <div className='user d-flex'>
                            <div className='user-avatar mb-3'>
                                <img alt='user avatar' src='http://via.placeholder.com/32x32'></img>
                            </div>
                            <b>Username</b>
                        </div>

                        {/* content */}
                        <div className='content mb-3'>
                            <textarea rows='6' className='w-100' placeholder='Bạn đang nghĩ gì?'></textarea>
                            
                            {/* Hiển thị hình ảnh/video upload */}
                            <img src='http://via.placeholder.com/600x200' width='100%' height='100%' alt='Blog img'></img>
                            <div className='text-center mt-2'>
                                <iframe title='post ytb video' src='https://www.youtube.com/embed/jn8NhISy9rg' frameBorder='0' allowFullScreen></iframe> 
                            </div>

                            {/* button upload img, video */}
                            <div className='d-flex justify-content-between border border-secondary rounded px-3 py-1'>
                                <div className='my-auto'>Thêm vào bài viết</div>
                                <div className='d-flex flex-row'>
                                    <div>
                                        <label htmlFor='input-img' className='cursor-pointer btn-upload btn-img'><FontAwesomeIcon icon='fa-solid fa-images' className='mx-auto w-100' /></label>
                                        <input hidden type='file' id='input-img' name='img' accept='image/*'></input>
                                    </div>
                                    <div>
                                        <Popup
                                            trigger={<div className='btn-upload btn-ytb'><FontAwesomeIcon icon={faYoutube} className='mx-auto w-100' /></div>}
                                            modal
                                            nested
                                        >
                                            {close2 => (
                                                <div className='form-upload-ytb'>
                                                    <div className='w-100 text-end '>
                                                        <button onClick={close2} className='border border-1 rounded-circle'>
                                                            &times;
                                                        </button>
                                                    </div>

                                                    <div className='text-center mx-auto w-100 text-danger'><h1 className='mb-0'><FontAwesomeIcon icon={faYoutube} /></h1></div>
                                                    <div className='text-center text-danger'><h2>YouTube</h2></div>

                                                    <input type='text' placeholder='Nhập đường dẫn video YouTube' className='w-100 border border-danger rounded-pill py-1 px-3 mb-2'></input>

                                                    <div className='text-center mb-3'>
                                                        <button type='button' class='btn btn-danger rounded-pill py-1 w-50'>Thêm</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                    </div>
                                </div>
                            </div>
                            {/* END upload img, video */}
                            
                        </div>

                        {/* footer */}
                        <div>
                            <button type='button' className='btn btn-primary w-100'>Đăng</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}

export default PostModal;
