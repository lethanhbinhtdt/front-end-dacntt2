import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import { BASE_URL } from '../../middlewares/constant';
import { getCookieToken } from '../../middlewares/common'
import { SocketContext } from '../../middlewares/socket';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../../css/NavBar.css';

function NavBar(props) {
    const { currUserInfo, setCurrUserInfo } = props
    const navigate = useNavigate();
    // const [removeCookie] = useCookies(['access_token'])
    const imageClick = () => {
        navigate('/personal/post', { replace: true });
    }
    const [nameUserFind, setNameUserFind] = useState();

    const socket = useContext(SocketContext);
    const token = getCookieToken()
    useEffect(()=>{
        fetch(`${BASE_URL}api/account`, 
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        .then((res)=>{
          if(res.ok){
              return res.json()
          }
        })
        .then(data=>{
            socket.emit("newUser", data?._id);
            setCurrUserInfo(data)
           
        })
        .catch(err=>{
            console.error(err)
        })
    }, [])
    

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
