import React, { useState } from 'react';
import Popup from 'reactjs-popup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import PostModalContent from './PostModalContent';

function PostModal() {
    // thông tin bài đăng: postContent, postVideo, postImages
    const postContent = useFormInput('');
    const [postVideo, setPostVideo] = useState('');
    const [idYtb, setIdYtb] = useState('');

    //-- post modal --//
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => {
        setOpenModal(false)
        // TODO: reset form
    };

    const handleSubmitPost = (e) => {
        e.preventDefault();
        console.log(postContent, postVideo);
        setOpenModal(false)
    }

    //-- popup thêm video youtube --//
    const [openYtb, setOpenYtb] = useState(false);
    const closeModalYtb = () => {
        setOpenYtb(false);
        
        // TODO: reset form
    };

    const addPostVideo = useFormInput('');
    const [linkIsValid, setLinkIsValid] = useState(true);

    const handleSubmitVideo = (e) => {
        e.preventDefault();
        const id = getIdLinkYoutube(addPostVideo);
        if (id) {
            setLinkIsValid(true);
            setIdYtb(id);
            setPostVideo(addPostVideo.value);
            addPostVideo.value = '';

            // TODO: reset form
            setOpenYtb(false);
        } else {
            setLinkIsValid(false);
        }
    }
    
    return (
        <div>
            <button onClick={() => setOpenModal(o => !o)} type='button' className='btn btn-post'>Bạn đang nghĩ gì?</button>
            <Popup
                modal
                open={openModal}
                onClose={closeModal}
                nested
            >
                <div className='post-modal'>
                    {/* header */}
                    <div className='header d-flex justify-content-between'>
                        <div> </div>
                        <h4 className='text-center'>Tạo bài viết</h4>
                        <button className='close-button text-right' onClick={() => setOpenModal(false)}>
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
                        <textarea
                            rows='4'
                            className='w-100'
                            placeholder='Bạn đang nghĩ gì?'
                            name='postContent' {...postContent}>
                        </textarea>

                        {/* Hiển thị hình ảnh/video upload */}
                        {/* <img src='http://via.placeholder.com/600x200' width='100%' height='100%' alt='Blog img'></img> */}

                        <div className='text-center mt-2'>
                            {(postVideo.length>0) && <iframe title='post ytb video' src={'https://www.youtube.com/embed/'+idYtb} frameBorder='0' allowFullScreen></iframe> }
                        </div>

                        {/* button upload img, video */}
                        <div className='d-flex justify-content-between border border-secondary rounded px-3 py-1'>
                            <div className='my-auto'>Thêm vào bài viết</div>
                            <div className='d-flex flex-row'>
                                {/* img */}
                                <div>
                                    <label htmlFor='input-img' className='cursor-pointer btn-upload btn-img'><FontAwesomeIcon icon='fa-solid fa-images' className='mx-auto w-100' /></label>
                                    <input hidden type='file' id='input-img' name='img' accept='image/*'></input>
                                </div>
                                {/* video youtube */}
                                <div>
                                    <div onClick={() => setOpenYtb(o => !o)} className='btn-upload btn-ytb'><FontAwesomeIcon icon={faYoutube} className='mx-auto w-100' /></div>
                                    <Popup
                                        modal
                                        nested
                                        open={openYtb}
                                        onClose={closeModalYtb}
                                    >
                                        <div className='form-upload-ytb'>
                                            <div className='w-100 text-end'>
                                                <button onClick={() => setOpenYtb(false)} className='border border-1 rounded-circle'>
                                                    &times;
                                                </button>
                                            </div>

                                            <div className='text-center mx-auto w-100 text-danger'><h1 className='mb-0'><FontAwesomeIcon icon={faYoutube} /></h1></div>
                                            <div className='text-center text-danger'><h2>YouTube</h2></div>
                                            <form className='form' onSubmit={handleSubmitVideo}>
                                                <input
                                                    type='text'
                                                    placeholder='Nhập đường dẫn video YouTube'
                                                    className='w-100 border border-danger rounded-pill py-1 px-3 mb-2'
                                                    name='addPostVideo'
                                                    {...addPostVideo}>
                                                </input>

                                                <div className='text-center mb-1'>
                                                    <button type='submit' className='btn btn-danger rounded-pill py-1 w-50'>Thêm</button>
                                                </div>
                                                {(!linkIsValid) && <div className='text-center fw-bold w-100 bg-warning rounded-pill py-1'>Đường dẫn không hợp lệ!</div>}
                                            </form>
                                        </div>
                                    </Popup>
                                </div>
                                {/* END video youtube */}
                            </div>
                        </div>
                        {/* END upload img, video */}

                    </div>

                    {/* footer */}
                    <div>
                        <button onClick={handleSubmitPost} type='button' className='btn btn-primary w-100'>Đăng</button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

// example: username.value = 'hello react'; console.log(username.value); 
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}


const getIdLinkYoutube = (url) => {
    // use regExp to split link id
    let regExp = new RegExp(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);
    let match = url.value.match(regExp);
    let id = (match && match[7].length == 11) ? match[7] : false;
    return id
}
export default PostModal;
