import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

function AuthorPost(props) {
    const [text, setText] = useState('');
    useEffect(() => {
        console.log(text)
    });

    return (
        <div>
            {/* Người đăng */}
            <div className='d-flex justify-content-between'>
                <div className='d-flex d-row'>
                    <img className='post-auth-img rounded-circle'
                        src='http://via.placeholder.com/35x35'
                        alt='Avatar user'></img>
                    <div className='flex-column ms-2'>
                        <Link to='/user/profile/' className='post-auth-name'>
                            <b>username </b>
                        </Link>
                        <p className='text-secondary fs-small'>
                            18/05/2022
                        </p>
                    </div>
                </div>
                {/* sửa/xóa */}
                <Dropdown>
                    <Dropdown.Toggle className='rounded-pill py-0 bg-white border-0 text-dark'>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setText('Sửa bài đăng')}>Sửa</Dropdown.Item>
                        <Dropdown.Item onClick={() => setText('Xóa bài đăng')}>Xóa</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default AuthorPost;
