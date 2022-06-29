import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

function AuthorPost(props) {

    const {deletePost, dataPostInfo, setOpenModal} = props;
    const author = props.dataAuthorInfo?.createdBy

    const handleDeletePost = (e) => {
        e.preventDefault();
        deletePost(dataPostInfo._id);
    }
    const handleUpdatePost = (e) => {
        e.preventDefault();
        setOpenModal(o => !o);
    }
    return (
        <div>
            {/* Người đăng */}
            <div id ={author?._id} className='d-flex justify-content-between'>
                <div className='d-flex d-row'>
                    <img className='post-auth-img rounded-circle'
                        src={author?.picture}
                        alt='Avatar user'></img>
                    <div className='flex-column ms-2'>
                        <Link to= {`/personal/${author?._id}/post/`} className='post-auth-name' state={{"id": author?._id}}>
                            <b> {author?.fullname}</b>
                        </Link>
                        <p className='text-secondary fs-small'>
                            {author?.createdAt}
                        </p>
                    </div>
                </div>
                {/* sửa/xóa */}
                <Dropdown>
                    <Dropdown.Toggle className='rounded-pill py-0 bg-white border-0 text-dark'>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleUpdatePost}>Sửa</Dropdown.Item>
                        <Dropdown.Item onClick={handleDeletePost}>Xóa</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </div>
    );
}

export default AuthorPost;
