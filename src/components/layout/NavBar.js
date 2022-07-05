import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { SocketContext } from '../../middlewares/socket';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCaretDown, faPaperPlane, faSend } from '@fortawesome/free-solid-svg-icons'
import '../../css/NavBar.css';

function NavBar(props) {
    const { currUserInfo } = props
    const navigate = useNavigate();
    // const [removeCookie] = useCookies(['access_token'])
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
    const imageClick = () => {
        navigate('/personal/post', { replace: true });
    }
    const [nameUserFind, setNameUserFind] = useState()
    const [socketdata, setSocketData] = useState()

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit("newUser", currUserInfo?._id);
    }, []);

    const findFriend = () => {
        navigate(`/search/?name=${nameUserFind}`, { state: { "currentUserId": currUserInfo?._id } }, { replace: true });
    }

    return (
        <>
            <div className='bg-top-color'></div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='d-flex justify-content-between w-100 mx-5'>
                    <NavLink to='/' className='navbar-brand'>TDTU</NavLink>

                    <form className='d-flex rounded-pill px-3 search-bar'>
                        {/* <FontAwesomeIcon icon={faSearch} className='mx-3 my-auto'/> */}
                        <input type='text' className='search-input py-2' placeholder='Tìm kiếm...' onChange={(e) => { setNameUserFind(e.target.value) }}></input>
                        <button type="button" className="btn"><FontAwesomeIcon icon={faSearch} onClick={findFriend} className='my-auto' /></button>
                    </form>

                    <div>
                        {/* <img src='http://via.placeholder.com/32x32' className='rounded-circle nav-avatar' alt='avatar' onClick={() => imageClick()}></img> */}
                        <img src={currUserInfo?.picture} className='rounded-circle nav-avatar' alt='avatar'></img>
                        <Link className='text-dark fw-bold text-decoration-none' to={`/personal/${currUserInfo?._id}/post/`} state={{ "id": currUserInfo?._id }}> {currUserInfo?.fullname}</Link>
                    </div>
                </div>


            </nav>
        </>
    );
}

export default NavBar;
