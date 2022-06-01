import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

function Comments(props) {
    const [text, setText] = useState('');
    useEffect(() => {
        console.log(text)
    });

    return (
        <div>
            <hr></hr>
            {/* 1 comment */}
            <div className='mb-3 d-flex d-row'>
                <img className='comment-img' src='http://via.placeholder.com/32x32' alt='Avatar user'></img>
                <div className='flex-column comment-content'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Link to='/user/profile/' className='text-dark text-decoration-none'><b>Username</b></Link>
                            <div className='text-secondary fs-smaller'>
                                18/05/2022
                            </div>
                        </div>

                        {/* sửa/xóa */}
                        <Dropdown>
                            <Dropdown.Toggle className='ms-2 rounded-pill py-0 bg-my-color border-0 text-dark'>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setText('Sửa bài đăng')}>Sửa</Dropdown.Item>
                                <Dropdown.Item onClick={() => setText('Xóa bài đăng')}>Xóa</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='text-justify'>
                        comment 'cookies' is assigned a value but never used
                    </div>
                </div>
            </div>
            {/* end 1 comment */}

            {/* 2 comment */}
            <div className='mb-3 d-flex d-row'>
                <img className='comment-img' src='http://via.placeholder.com/32x32' alt='Avatar user'></img>
                <div className='flex-column comment-content'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Link to='/user/profile/' className='text-dark text-decoration-none'><b>Username</b></Link>
                            <div className='text-secondary fs-smaller'>
                                18/05/2022
                            </div>
                        </div>

                        {/* sửa/xóa */}
                        <Dropdown>
                            <Dropdown.Toggle className='ms-2 rounded-pill py-0 bg-my-color border-0 text-dark'>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setText('Sửa bài đăng')}>Sửa</Dropdown.Item>
                                <Dropdown.Item onClick={() => setText('Xóa bài đăng')}>Xóa</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='text-justify'>
                        comment
                    </div>
                </div>
            </div>
            {/* end 2 comment */}
        </div>
    );
}

export default Comments;
