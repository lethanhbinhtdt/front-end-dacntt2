import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import '../../css/NavBar.css';

function NavBar(props) {
    const navigate = useNavigate();
    const imageClick = () => {
        navigate('/personal', { replace: true });
    }

    return (
        <>
            <div className='bg-top-color'></div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='d-flex justify-content-between w-100 mx-5'>
                    <NavLink to='/' className='navbar-brand'>TDTU</NavLink>

                    <form className='d-flex rounded-pill px-3 search-bar'>
                        <FontAwesomeIcon icon={faSearch} className='mx-3 my-auto'/>
                        <input type='text' className='search-input py-2' placeholder='Tìm kiếm...'></input>
                    </form>

                    <img src='http://via.placeholder.com/32x32' className='rounded-circle nav-avatar' alt='avatar' onClick={() => imageClick()}></img>
                </div>
                
            </nav>
        </>
    );
}

export default NavBar;
